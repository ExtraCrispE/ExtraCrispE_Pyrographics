import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Maximize2
} from 'lucide-react';
import FloatingContactButton from '../components/FloatingContactButton';
import GalleryCard, { GalleryImage } from '../components/GalleryCard';
import { getCDNUrl } from '../utils/constants';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxContent, setLightboxContent] = useState<{ images: GalleryImage[]; initialIndex: number; } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 12;

  const categories = ['All', 'Nature', 'Symbolic', 'Anime', 'Commissions'];

  // Mock gallery data
  const galleryItems = [
    // Nature Category
    { 
      id: 1, 
      category: 'Nature', 
      title: 'Majestic Eagle', 
      description: 'Stunning eagle portraits with incredible detail work',
      images: [
        { id: 1, title: 'Eagle Portrait 1', description: 'Detailed eagle head with piercing eyes', src: '/Gallery/Nature/Eagle/Eagle.jpg', type: 'image' },
        { id: 2, title: 'Eagle Portrait 2', description: 'Side profile showing feather texture', src: '/Gallery/Nature/Eagle/Eagle1.jpg', type: 'image' },
        { id: 3, title: 'Eagle Portrait 3', description: 'Full eagle with spread wings', src: '/Gallery/Nature/Eagle/Eagle2.jpg', type: 'image' },
        { id: 4, title: 'Eagle Detail', description: 'Close-up of intricate feather work', src: '/Gallery/Nature/Eagle/Eagle3.jpg', type: 'image' }
      ]
    },

    // Anime Category
    { 
      id: 2, 
      category: 'Anime', 
      title: 'Black and Gold Collection', 
      description: 'Elegant anime artwork with gold foil accents',
      images: [
        { id: 1, title: 'Black and Gold 1', description: 'Character portrait with gold highlights', src: '/Gallery/Anime/BlackandGold/BlackAndGold.jpg', type: 'image' },
        { id: 2, title: 'Black and Gold 2', description: 'Detailed character work', src: '/Gallery/Anime/BlackandGold/BlackAndGold2.jpg', type: 'image' },
        { id: 3, title: 'Black and Gold 3', description: 'Full character design', src: '/Gallery/Anime/BlackandGold/BlackAndGold3.jpg', type: 'image' },
        { id: 4, title: 'Black and Gold 4', description: 'Alternative angle view', src: '/Gallery/Anime/BlackandGold/BlackAndGold4.jpg', type: 'image' },
        { id: 5, title: 'Black and Gold 5', description: 'Detail shot of gold work', src: '/Gallery/Anime/BlackandGold/BlackAndGold5.jpg', type: 'image' },
        { id: 6, title: 'Black and Gold 6', description: 'Character expression detail', src: '/Gallery/Anime/BlackandGold/BlackAndGold6.jpg', type: 'image' },
        { id: 7, title: 'Black and Gold 7', description: 'Final artwork showcase', src: '/Gallery/Anime/BlackandGold/BlackAndGold7.jpg', type: 'image' }
      ]
    },

    { 
      id: 3, 
      category: 'Anime', 
      title: 'Akame Ga Kill', 
      description: 'Dynamic anime character artwork',
      images: [
        { id: 1, title: 'Akame Main', description: 'Main character portrait', src: '/Gallery/Anime/AkameGaKill/Akame_Ga_Kill.jpg', type: 'image' },
        { id: 2, title: 'Akame Detail 1', description: 'Character detail work', src: '/Gallery/Anime/AkameGaKill/Akame_Ga_Kill-1.jpg', type: 'image' },
        { id: 3, title: 'Akame Detail 2', description: 'Weapon and clothing details', src: '/Gallery/Anime/AkameGaKill/Akame_Ga_Kill-2.jpg', type: 'image' },
        { id: 4, title: 'Akame Detail 3', description: 'Final character showcase', src: '/Gallery/Anime/AkameGaKill/Akame_Ga_Kill-3.jpg', type: 'image' }
      ]
    },

    { 
      id: 4, 
      category: 'Anime', 
      title: 'Dragon Ball Z - Fusion', 
      description: 'Epic DBZ fusion characters',
      images: [
        { id: 1, title: 'Fusion Character 1', description: 'First fusion artwork', src: '/Gallery/Anime/DBZ/DBZ1/Fusion1.jpg', type: 'image' },
        { id: 2, title: 'Fusion Character 2', description: 'Second fusion piece', src: '/Gallery/Anime/DBZ/DBZ1/Fusion2.jpg', type: 'image' }
      ]
    },

    { 
      id: 5, 
      category: 'Anime', 
      title: 'Dragon Ball Z - Frieza', 
      description: 'Detailed Frieza character artwork',
      images: [
        { id: 1, title: 'Frieza Face', description: 'Detailed facial features', src: '/Gallery/Anime/DBZ/Frieza/Frieza-face.jpg', type: 'image' },
        { id: 2, title: 'Frieza Close-up', description: 'Intricate detail work', src: '/Gallery/Anime/DBZ/Frieza/Frieza-Close-up.jpg', type: 'image' },
        { id: 3, title: 'Frieza Close-up 2', description: 'Alternative close-up view', src: '/Gallery/Anime/DBZ/Frieza/Frieza-Close-up2.jpg', type: 'image' },
        { id: 4, title: 'Frieza Angled', description: 'Dynamic angled shot', src: '/Gallery/Anime/DBZ/Frieza/Freiza-angled-shot.jpg', type: 'image' }
      ]
    },

    { 
      id: 6, 
      category: 'Anime', 
      title: 'Demon Slayer Collection', 
      description: 'Beautiful Demon Slayer artwork series',
      images: [
        { id: 1, title: 'DS Coaster', description: 'Demon Slayer coaster design', src: '/Gallery/Anime/DemonSlayer/DScoster/D_S_Coster.jpg', type: 'image' },
        { id: 2, title: 'DS Fan Art', description: 'Main fan art piece', src: '/Gallery/Anime/DemonSlayer/DSFAN/D_S_Fan.jpg', type: 'image' },
        { id: 3, title: 'DS Fan Art 1', description: 'Character detail work', src: '/Gallery/Anime/DemonSlayer/DSFAN/D_S_Fan1.jpg', type: 'image' },
        { id: 4, title: 'DS Fan Art 2', description: 'Additional character details', src: '/Gallery/Anime/DemonSlayer/DSFAN/D_S_Fan2.jpg', type: 'image' },
        { id: 5, title: 'DS Fan Art 3', description: 'Final artwork showcase', src: '/Gallery/Anime/DemonSlayer/DSFAN/D_S_Fan3.jpg', type: 'image' },
        { id: 6, title: 'DS CO 1', description: 'Commission piece 1', src: '/Gallery/Anime/DemonSlayer/DSCO/DSCO_1.jpg', type: 'image' },
        { id: 7, title: 'DS CO 2', description: 'Commission piece 2', src: '/Gallery/Anime/DemonSlayer/DSCO/DSCO_2.jpg', type: 'image' }
      ]
    },

    { 
      id: 7, 
      category: 'Anime', 
      title: 'Legend of Zelda - Breath of the Wild', 
      description: 'Epic BotW landscape and character art',
      images: [
        { id: 1, title: 'BotW Main', description: 'Main BotW artwork', src: '/Gallery/Anime/LOZ/BotW/BotW.jpg', type: 'image' },
        { id: 2, title: 'BotW Scene 1', description: 'Landscape scene', src: '/Gallery/Anime/LOZ/BotW/BotW1.jpg', type: 'image' },
        { id: 3, title: 'BotW Scene 2', description: 'Character in landscape', src: '/Gallery/Anime/LOZ/BotW/BotW2.jpg', type: 'image' },
        { id: 4, title: 'BotW Scene 3', description: 'Detailed environment work', src: '/Gallery/Anime/LOZ/BotW/BotW3.jpg', type: 'image' },
        { id: 5, title: 'BotW Scene 4', description: 'Final scene showcase', src: '/Gallery/Anime/LOZ/BotW/BotW4.jpg', type: 'image' }
      ]
    },

    { 
      id: 8, 
      category: 'Anime', 
      title: 'Legend of Zelda - Link', 
      description: 'Detailed Link character portraits',
      images: [
        { id: 1, title: 'Link Portrait', description: 'Main Link portrait', src: '/Gallery/Anime/LOZ/Link/Link.jpg', type: 'image' },
        { id: 2, title: 'Link Detail 1', description: 'Character detail work', src: '/Gallery/Anime/LOZ/Link/Link1.jpg', type: 'image' },
        { id: 3, title: 'Link Detail 2', description: 'Equipment and clothing', src: '/Gallery/Anime/LOZ/Link/Link2.jpg', type: 'image' },
        { id: 4, title: 'Link Detail 3', description: 'Facial expression work', src: '/Gallery/Anime/LOZ/Link/Link3.jpg', type: 'image' },
        { id: 5, title: 'Link Detail 4', description: 'Action pose artwork', src: '/Gallery/Anime/LOZ/Link/Link4.jpg', type: 'image' },
        { id: 6, title: 'Link Detail 5', description: 'Alternative character view', src: '/Gallery/Anime/LOZ/Link/Link5.jpg', type: 'image' },
        { id: 7, title: 'Link Detail 6', description: 'Final character showcase', src: '/Gallery/Anime/LOZ/Link/Link6.jpg', type: 'image' }
      ]
    },

    { 
      id: 9, 
      category: 'Anime', 
      title: 'Legend of Zelda - Zelda', 
      description: 'Princess Zelda character artwork',
      images: [
        { id: 1, title: 'Zelda Portrait', description: 'Main Zelda portrait', src: '/Gallery/Anime/LOZ/Zelda/Zelda.jpg', type: 'image' },
        { id: 2, title: 'Zelda Detail 1', description: 'Character detail work', src: '/Gallery/Anime/LOZ/Zelda/Zelda1.jpg', type: 'image' },
        { id: 3, title: 'Zelda Detail 2', description: 'Dress and accessories', src: '/Gallery/Anime/LOZ/Zelda/Zelda2.jpg', type: 'image' },
        { id: 4, title: 'Zelda Detail 3', description: 'Facial features detail', src: '/Gallery/Anime/LOZ/Zelda/Zelda3.jpg', type: 'image' },
        { id: 5, title: 'Zelda Detail 4', description: 'Final character showcase', src: '/Gallery/Anime/LOZ/Zelda/Zelda4.jpg', type: 'image' }
      ]
    },

    { 
      id: 10, 
      category: 'Anime', 
      title: 'Legend of Zelda - Ganon', 
      description: 'Powerful Ganon villain artwork',
      images: [
        { id: 1, title: 'Ganon Portrait 1', description: 'Main Ganon artwork', src: '/Gallery/Anime/LOZ/Ganon/Ganon1.jpg', type: 'image' },
        { id: 2, title: 'Ganon Portrait 2', description: 'Alternative Ganon view', src: '/Gallery/Anime/LOZ/Ganon/Ganon2.jpg', type: 'image' },
        { id: 3, title: 'Ganon Portrait 3', description: 'Detailed villain work', src: '/Gallery/Anime/LOZ/Ganon/Ganon3.jpg', type: 'image' },
        { id: 4, title: 'Ganon Portrait 4', description: 'Final Ganon showcase', src: '/Gallery/Anime/LOZ/Ganon/Ganon4.jpg', type: 'image' }
      ]
    },

    { 
      id: 11, 
      category: 'Anime', 
      title: 'Gundam Collection', 
      description: 'Mecha artwork featuring iconic Gundam designs',
      images: [
        { id: 1, title: 'Gundam Main', description: 'Main Gundam artwork', src: '/Gallery/Anime/Gundam/Gundam.jpg', type: 'image' },
        { id: 2, title: 'Gundam Detail', description: 'Detailed mecha work', src: '/Gallery/Anime/Gundam/Gundam-2.jpg', type: 'image' }
      ]
    },

    { 
      id: 12, 
      category: 'Anime', 
      title: 'Zaku II Mobile Suit', 
      description: 'Detailed Zaku II mecha artwork series',
      images: [
        { id: 1, title: 'Zaku II Main', description: 'Main Zaku II artwork', src: '/Gallery/Anime/Gundam2/Zakuii.jpg', type: 'image' },
        { id: 2, title: 'Zaku II Detail 1', description: 'Mecha detail work', src: '/Gallery/Anime/Gundam2/Zakuii1.jpg', type: 'image' },
        { id: 3, title: 'Zaku II Detail 2', description: 'Weapon systems detail', src: '/Gallery/Anime/Gundam2/Zakuii2.jpg', type: 'image' },
        { id: 4, title: 'Zaku II Detail 3', description: 'Armor plating work', src: '/Gallery/Anime/Gundam2/Zakuii3.jpg', type: 'image' },
        { id: 5, title: 'Zaku II Detail 4', description: 'Head unit detail', src: '/Gallery/Anime/Gundam2/Zakuii4.jpg', type: 'image' },
        { id: 6, title: 'Zaku II Detail 5', description: 'Torso section work', src: '/Gallery/Anime/Gundam2/Zakuii5.jpg', type: 'image' },
        { id: 7, title: 'Zaku II Detail 6', description: 'Leg assembly detail', src: '/Gallery/Anime/Gundam2/Zakuii6.jpg', type: 'image' },
        { id: 8, title: 'Zaku II Detail 7', description: 'Shoulder armor work', src: '/Gallery/Anime/Gundam2/Zakuii7.jpg', type: 'image' },
        { id: 9, title: 'Zaku II Detail 8', description: 'Back unit detail', src: '/Gallery/Anime/Gundam2/Zakuii8.jpg', type: 'image' },
        { id: 10, title: 'Zaku II Detail 9', description: 'Weapon detail work', src: '/Gallery/Anime/Gundam2/Zakuii9.jpg', type: 'image' },
        { id: 11, title: 'Zaku II Detail 10', description: 'Joint mechanism work', src: '/Gallery/Anime/Gundam2/Zakuii10.jpg', type: 'image' },
        { id: 12, title: 'Zaku II Detail 11', description: 'Panel line detail', src: '/Gallery/Anime/Gundam2/Zakuii11.jpg', type: 'image' },
        { id: 13, title: 'Zaku II Detail 12', description: 'Surface texture work', src: '/Gallery/Anime/Gundam2/Zakuii12.jpg', type: 'image' },
        { id: 14, title: 'Zaku II Detail 13', description: 'Battle damage effects', src: '/Gallery/Anime/Gundam2/Zakuii13.jpg', type: 'image' },
        { id: 15, title: 'Zaku II Detail 14', description: 'Final assembly view', src: '/Gallery/Anime/Gundam2/Zakuii14.jpg', type: 'image' },
        { id: 16, title: 'Zaku II Detail 15', description: 'Complete mecha showcase', src: '/Gallery/Anime/Gundam2/Zakuii15.jpg', type: 'image' },
        { id: 17, title: 'Zaku II Detail 16', description: 'Final artwork presentation', src: '/Gallery/Anime/Gundam2/Zakuii16.jpg', type: 'image' }
      ]
    },

    // Commissions Category
    { 
      id: 13, 
      category: 'Commissions', 
      title: 'Warhammer 40K - Magnus the Red', 
      description: 'Epic Primarch commission with incredible detail',
      images: [
        { id: 1, title: 'Magnus Main', description: 'Main Magnus artwork', src: '/Gallery/Comissions/WH40K/Magnus/Magnus.jpg', type: 'image' },
        { id: 2, title: 'Magnus Detail 1', description: 'Character detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus-1.jpg', type: 'image' },
        { id: 3, title: 'Magnus Close 1', description: 'Close-up detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus1-close.jpg', type: 'image' },
        { id: 4, title: 'Magnus Close 2', description: 'Facial detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus2-close.jpg', type: 'image' },
        { id: 5, title: 'Magnus Close 3', description: 'Additional close-up', src: '/Gallery/Comissions/WH40K/Magnus/Magnus2-close2.jpg', type: 'image' },
        { id: 6, title: 'Magnus Far', description: 'Full figure view', src: '/Gallery/Comissions/WH40K/Magnus/Magnus2-far.jpg', type: 'image' },
        { id: 7, title: 'Magnus Detail 3', description: 'Armor detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus3.jpg', type: 'image' },
        { id: 8, title: 'Magnus Detail 4', description: 'Weapon detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus4.jpg', type: 'image' },
        { id: 9, title: 'Magnus Detail 5', description: 'Wing detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus5.jpg', type: 'image' },
        { id: 10, title: 'Magnus Detail 6', description: 'Psychic effects work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus6.jpg', type: 'image' },
        { id: 11, title: 'Magnus Detail 7', description: 'Additional detail work', src: '/Gallery/Comissions/WH40K/Magnus/Magnus7.jpg', type: 'image' },
        { id: 12, title: 'Magnus Detail 8', description: 'Final detail showcase', src: '/Gallery/Comissions/WH40K/Magnus/Magnus8.jpg', type: 'image' },
        { id: 13, title: 'Magnus Detail 9', description: 'Complete artwork view', src: '/Gallery/Comissions/WH40K/Magnus/Magnus9.jpg', type: 'image' },
        { id: 14, title: 'Magnus Detail 10', description: 'Final presentation', src: '/Gallery/Comissions/WH40K/Magnus/Magnus10.jpg', type: 'image' }
      ]
    },

    { 
      id: 14, 
      category: 'Commissions', 
      title: 'Warhammer 40K - Angron', 
      description: 'Fierce Primarch commission artwork',
      images: [
        { id: 1, title: 'Angron Main', description: 'Main Angron artwork', src: '/Gallery/Comissions/WH40K/Angron/Angron.jpg', type: 'image' },
        { id: 2, title: 'Angron Base', description: 'Base artwork view', src: '/Gallery/Comissions/WH40K/Angron/Angron0.jpg', type: 'image' },
        { id: 3, title: 'Angron Detail 1', description: 'Character detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron1.jpg', type: 'image' },
        { id: 4, title: 'Angron Detail 2', description: 'Armor detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron2.jpg', type: 'image' },
        { id: 5, title: 'Angron Detail 3', description: 'Weapon detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron3.jpg', type: 'image' },
        { id: 6, title: 'Angron Detail 4', description: 'Facial detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron4.jpg', type: 'image' },
        { id: 7, title: 'Angron Detail 5', description: 'Additional detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron5.jpg', type: 'image' },
        { id: 8, title: 'Angron Detail 6', description: 'Texture detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron6.jpg', type: 'image' },
        { id: 9, title: 'Angron Detail 7', description: 'Battle damage work', src: '/Gallery/Comissions/WH40K/Angron/Angron7.jpg', type: 'image' },
        { id: 10, title: 'Angron Detail 8', description: 'Surface texture detail', src: '/Gallery/Comissions/WH40K/Angron/Angron8.jpg', type: 'image' },
        { id: 11, title: 'Angron Detail 9', description: 'Final detail work', src: '/Gallery/Comissions/WH40K/Angron/Angron9.jpg', type: 'image' },
        { id: 12, title: 'Angron Detail 10', description: 'Complete view 1', src: '/Gallery/Comissions/WH40K/Angron/Angron10.jpg', type: 'image' },
        { id: 13, title: 'Angron Detail 11', description: 'Complete view 2', src: '/Gallery/Comissions/WH40K/Angron/Angron11.jpg', type: 'image' },
        { id: 14, title: 'Angron Detail 12', description: 'Final showcase 1', src: '/Gallery/Comissions/WH40K/Angron/Angron12.jpg', type: 'image' },
        { id: 15, title: 'Angron Detail 14', description: 'Final showcase 2', src: '/Gallery/Comissions/WH40K/Angron/Angron14.jpg', type: 'image' },
        { id: 16, title: 'Angron Detail 15', description: 'Final showcase 3', src: '/Gallery/Comissions/WH40K/Angron/Angron15.jpg', type: 'image' },
        { id: 17, title: 'Angron Detail 16', description: 'Final showcase 4', src: '/Gallery/Comissions/WH40K/Angron/Angron16.jpg', type: 'image' },
        { id: 18, title: 'Angron Detail 17', description: 'Final presentation', src: '/Gallery/Comissions/WH40K/Angron/Angron17.jpg', type: 'image' }
      ]
    },

    { 
      id: 15, 
      category: 'Commissions', 
      title: 'Warhammer 40K - Abaddon', 
      description: 'Warmaster Abaddon commission piece',
      images: [
        { id: 1, title: 'Abaddon Full', description: 'Full Abaddon artwork', src: '/Gallery/Comissions/WH40K/Abaddon/Abaddon-Full.jpg', type: 'image' },
        { id: 2, title: 'Abaddon Close-up', description: 'Detailed close-up work', src: '/Gallery/Comissions/WH40K/Abaddon/Abaddon-close-up.jpg', type: 'image' }
      ]
    },

    { 
      id: 16, 
      category: 'Commissions', 
      title: 'Warhammer 40K - Mortarion', 
      description: 'Death Guard Primarch artwork',
      images: [
        { id: 1, title: 'Mortarion', description: 'Mortarion Primarch artwork', src: '/Gallery/Comissions/WH40K/Mort/Mort.jpg', type: 'image' }
      ]
    },

    { 
      id: 17, 
      category: 'Commissions', 
      title: 'Monster Hunter - Nergigante', 
      description: 'Epic Monster Hunter commission with logo work',
      images: [
        { id: 1, title: 'Nergigante Main', description: 'Main Nergigante artwork', src: '/Gallery/Comissions/MonsterHunter/Nergi.jpg', type: 'image' },
        { id: 2, title: 'Nergigante Detail 1', description: 'Monster detail work', src: '/Gallery/Comissions/MonsterHunter/Nergi1.jpg', type: 'image' },
        { id: 3, title: 'Nergigante Detail 2', description: 'Spike detail work', src: '/Gallery/Comissions/MonsterHunter/Nergi2.jpg', type: 'image' },
        { id: 4, title: 'Nergigante Detail 3', description: 'Texture detail work', src: '/Gallery/Comissions/MonsterHunter/Nergi3.jpg', type: 'image' },
        { id: 5, title: 'Nergigante Detail 4', description: 'Final detail work', src: '/Gallery/Comissions/MonsterHunter/Nergi4.jpg', type: 'image' },
        { id: 6, title: 'Nergigante Detail 5', description: 'Complete monster view', src: '/Gallery/Comissions/MonsterHunter/Nergi5.jpg', type: 'image' },
        { id: 7, title: 'Nergigante Detail 6', description: 'Final showcase', src: '/Gallery/Comissions/MonsterHunter/Nergi6.jpg', type: 'image' },
        { id: 8, title: 'MH Logo 1', description: 'Monster Hunter logo work', src: '/Gallery/Comissions/MonsterHunter/Nergi-logo1.jpg', type: 'image' },
        { id: 9, title: 'MH Logo 2', description: 'Alternative logo design', src: '/Gallery/Comissions/MonsterHunter/Nergi-logo2.jpg', type: 'image' }
      ]
    },

    { 
      id: 18, 
      category: 'Commissions', 
      title: 'Legend of Zelda Commission', 
      description: 'Custom LoZ commission with process videos',
      images: [
        { id: 1, title: 'LoZ Commission Main', description: 'Main commission artwork', src: '/Gallery/Comissions/LoZ/LegendofZ.jpg', type: 'image' },
        { id: 2, title: 'LoZ Detail 1', description: 'Character detail work', src: '/Gallery/Comissions/LoZ/LegendofZ1.jpg', type: 'image' },
        { id: 3, title: 'LoZ Detail 2', description: 'Environment detail work', src: '/Gallery/Comissions/LoZ/LegendofZ2.jpg', type: 'image' },
        { id: 4, title: 'LoZ Detail 3', description: 'Additional detail work', src: '/Gallery/Comissions/LoZ/LegendofZ3.jpg', type: 'image' },
        { id: 5, title: 'LoZ Detail 4', description: 'Texture detail work', src: '/Gallery/Comissions/LoZ/LegendofZ4.jpg', type: 'image' },
        { id: 6, title: 'LoZ Detail 5', description: 'Final detail work', src: '/Gallery/Comissions/LoZ/LegendofZ5.jpg', type: 'image' },
        { id: 7, title: 'LoZ Detail 6', description: 'Complete view', src: '/Gallery/Comissions/LoZ/LegendofZ6.jpg', type: 'image' },
        { id: 8, title: 'LoZ Detail 7', description: 'Final showcase', src: '/Gallery/Comissions/LoZ/LegendofZ7.jpg', type: 'image' },
        { id: 9, title: 'LoZ Detail 8', description: 'Final presentation', src: '/Gallery/Comissions/LoZ/LegendofZ8.jpg', type: 'image' },
        { id: 10, title: 'LoZ Process Video 1', description: 'Time-lapse creation process', src: '/Gallery/Comissions/LoZ/LegendofZ-Vid1.mp4', type: 'video', thumbnail: '/Gallery/Comissions/LoZ/LegendofZ.jpg' },
        { id: 11, title: 'LoZ Process Video 2', description: 'Additional process footage', src: '/Gallery/Comissions/LoZ/LegendofZ-Vid2.mp4', type: 'video', thumbnail: '/Gallery/Comissions/LoZ/LegendofZ1.jpg' }
      ]
    },

    { 
      id: 19, 
      category: 'Commissions', 
      title: 'One Piece - Luffy', 
      description: 'One Piece commission with process video',
      images: [
        { id: 1, title: 'Luffy Portrait', description: 'Luffy character artwork', src: '/Gallery/Comissions/OnePiece/Luffy.jpg', type: 'image' },
        { id: 2, title: 'Luffy Process Video', description: 'Creation process time-lapse', src: '/Gallery/Comissions/OnePiece/LuffyVid.mp4', type: 'video', thumbnail: '/Gallery/Comissions/OnePiece/Luffy.jpg' }
      ]
    },

    { 
      id: 20, 
      category: 'Commissions', 
      title: 'Winnie the Pooh Collection', 
      description: 'Charming Winnie the Pooh family commission',
      images: [
        { id: 1, title: 'Pooh Main', description: 'Main Pooh artwork', src: '/Gallery/Comissions/WinnieThePooh/Pooh.jpg', type: 'image' },
        { id: 2, title: 'Pooh Detail 1', description: 'Character detail work', src: '/Gallery/Comissions/WinnieThePooh/Pooh1.jpg', type: 'image' },
        { id: 3, title: 'Pooh Detail 2', description: 'Additional character work', src: '/Gallery/Comissions/WinnieThePooh/pooh2.jpg', type: 'image' },
        { id: 4, title: 'Pooh Detail 3', description: 'Final character work', src: '/Gallery/Comissions/WinnieThePooh/pooh3.jpg', type: 'image' },
        { id: 5, title: 'Pooh and Friends', description: 'Complete friend group artwork', src: '/Gallery/Comissions/WinnieThePooh/Pooh-Bear_friends.jpg', type: 'image' }
      ]
    },

    { 
      id: 21, 
      category: 'Commissions', 
      title: 'Scream - Ghostface', 
      description: 'Horror movie commission artwork',
      images: [
        { id: 1, title: 'Ghostface 1', description: 'Main Ghostface artwork', src: '/Gallery/Comissions/Scream/Ghostface1.jpg', type: 'image' },
        { id: 2, title: 'Ghostface 2', description: 'Alternative Ghostface view', src: '/Gallery/Comissions/Scream/Ghostface2.jpg', type: 'image' }
      ]
    },

    { 
      id: 22, 
      category: 'Commissions', 
      title: 'Mixed Commission Collection', 
      description: 'Various custom commission pieces',
      images: [
        { id: 1, title: 'Baseball Cubs', description: 'Chicago Cubs commission', src: '/Gallery/Comissions/BaseBallCubs.jpg', type: 'image' },
        { id: 2, title: 'Blue Rose with Skull', description: 'Gothic rose design', src: '/Gallery/Comissions/BlueRoseWithSkull.jpg', type: 'image' },
        { id: 3, title: 'Care Bears', description: 'Care Bears character work', src: '/Gallery/Comissions/Carebears.jpg', type: 'image' },
        { id: 4, title: 'Cowboys Logo', description: 'Dallas Cowboys commission', src: '/Gallery/Comissions/Cowboys.jpg', type: 'image' },
        { id: 5, title: 'Dark Souls', description: 'Dark Souls game artwork', src: '/Gallery/Comissions/DarkSouls.jpg', type: 'image' },
        { id: 6, title: 'Darth Vader', description: 'Star Wars Darth Vader', src: '/Gallery/Comissions/Darth.jpg', type: 'image' },
        { id: 7, title: 'Fire Force', description: 'Fire Force anime artwork', src: '/Gallery/Comissions/FireForce.jpg', type: 'image' },
        { id: 8, title: 'Ladybug', description: 'Nature ladybug design', src: '/Gallery/Comissions/Ladybug.jpeg', type: 'image' },
        { id: 9, title: 'Link BotW', description: 'Breath of the Wild Link', src: '/Gallery/Comissions/LinkBotW.jpg', type: 'image' },
        { id: 10, title: 'My First Piece', description: 'Artist\'s first pyrography work', src: '/Gallery/Comissions/MyFirst.jpg', type: 'image' },
        { id: 11, title: 'Pikachu', description: 'Pokemon Pikachu artwork', src: '/Gallery/Comissions/Pikachu.jpeg', type: 'image' },
        { id: 12, title: 'Seahawks Logo', description: 'Seattle Seahawks commission', src: '/Gallery/Comissions/Seahawks.jpg', type: 'image' },
        { id: 13, title: 'Sonic', description: 'Sonic the Hedgehog artwork', src: '/Gallery/Comissions/Sonic.jpg', type: 'image' },
        { id: 14, title: 'Sport Team 1', description: 'Sports team commission', src: '/Gallery/Comissions/SportTeam.jpg', type: 'image' },
        { id: 15, title: 'Sport Team 2', description: 'Additional sports commission', src: '/Gallery/Comissions/SportTeam2.jpg', type: 'image' }
      ]
    },

    // Symbolic Category
    { 
      id: 23, 
      category: 'Symbolic', 
      title: 'Abstract Art Collection', 
      description: 'Abstract symbolic pyrography designs',
      images: [
        { id: 1, title: 'Abstract Design 1', description: 'Flowing abstract patterns', src: '/Gallery/Symbolic/Abstract/Abstract1.jpg', type: 'image' },
        { id: 2, title: 'Abstract Design 3', description: 'Geometric abstract work', src: '/Gallery/Symbolic/Abstract/Abstract3.jpg', type: 'image' },
        { id: 3, title: 'Abstract Design 4', description: 'Organic abstract forms', src: '/Gallery/Symbolic/Abstract/Abstract4.jpg', type: 'image' },
        { id: 4, title: 'Abstract Design 5', description: 'Complex abstract composition', src: '/Gallery/Symbolic/Abstract/Abstract5.jpg', type: 'image' },
        { id: 5, title: 'Abstract Design 6', description: 'Minimalist abstract work', src: '/Gallery/Symbolic/Abstract/Abstract6.jpg', type: 'image' },
        { id: 6, title: 'Abstract Design 7', description: 'Dynamic abstract patterns', src: '/Gallery/Symbolic/Abstract/Abstract7.jpg', type: 'image' }
      ]
    },

    { 
      id: 24, 
      category: 'Symbolic', 
      title: 'Commemorative Plaque', 
      description: 'Custom commemorative plaque design',
      images: [
        { id: 1, title: 'Memorial Plaque', description: 'Custom memorial plaque work', src: '/Gallery/Symbolic/Plaque/Plaque.jpg', type: 'image' }
      ]
    },

    { 
      id: 25, 
      category: 'Symbolic', 
      title: 'Bookmarker Collection', 
      description: 'Elegant pyrography bookmarkers',
      images: [
        { id: 1, title: 'Bookmarker Design 1', description: 'Decorative bookmarker', src: '/Gallery/Symbolic/BookMarker/BookMarker.jpg', type: 'image' },
        { id: 2, title: 'Bookmarker Design 2', description: 'Alternative bookmarker design', src: '/Gallery/Symbolic/BookMarker/BookMarker2.jpg', type: 'image' }
      ]
    },

    { 
      id: 26, 
      category: 'Symbolic', 
      title: 'Memorial Piece', 
      description: 'Touching memorial artwork',
      images: [
        { id: 1, title: 'Memorial Design', description: 'Custom memorial artwork', src: '/Gallery/Symbolic/Memorial.jpg', type: 'image' }
      ]
    },

    { 
      id: 27, 
      category: 'Symbolic', 
      title: 'Stoic Philosophy', 
      description: 'Philosophical symbolic artwork',
      images: [
        { id: 1, title: 'Stoic Design', description: 'Stoic philosophy inspired artwork', src: '/Gallery/Symbolic/Stoics.jpg', type: 'image' }
      ]
    }
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Lightbox Interactive Component
  const LightboxViewer: React.FC<{ content: { images: GalleryImage[]; initialIndex: number; } }> = ({ content }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(content.initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentImage = content.images[currentImageIndex];

    // Spring animation for zoom and pan
    const [{ x, y, scale }, api] = useSpring(() => ({
      x: 0,
      y: 0,
      scale: 1,
      config: { mass: 1, tension: 200, friction: 25 }
    }));

    // Gesture handling for zoom and pan
    const bind = useGesture(
      {
        onDrag: ({ offset: [ox, oy], memo = [x.get(), y.get()] }) => {
          if (scale.get() > 1 && currentImage.type === 'image') {
            api.start({ x: memo[0] + ox, y: memo[1] + oy });
          }
          return memo;
        },
        onPinch: ({ offset: [d], memo = scale.get() }) => {
          if (currentImage.type === 'image') {
            const newScale = Math.max(0.5, Math.min(3, memo + d / 200));
            api.start({ scale: newScale });
            setIsZoomed(newScale > 1);
          }
          return memo;
        },
        onWheel: ({ delta: [, dy] }) => {
          if (currentImage.type === 'image') {
            const newScale = Math.max(0.5, Math.min(3, scale.get() - dy / 1000));
            api.start({ scale: newScale });
            setIsZoomed(newScale > 1);
          }
        }
      },
      {
        drag: { 
          bounds: containerRef,
          rubberband: true
        },
        pinch: { 
          scaleBounds: { min: 0.5, max: 3 },
          rubberband: true
        }
      }
    );

    // Handle video playback when image changes
    useEffect(() => {
      if (currentImage.type === 'video' && videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay failed, user interaction required
        });
      }
    }, [currentImageIndex, currentImage.type]);
    // Navigation functions
    const goToNext = useCallback(() => {
      const nextIndex = (currentImageIndex + 1) % content.images.length;
      setCurrentImageIndex(nextIndex);
      resetZoom();
    }, [currentImageIndex, content.images.length]);

    const goToPrevious = useCallback(() => {
      const prevIndex = currentImageIndex === 0 ? content.images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      resetZoom();
    }, [currentImageIndex, content.images.length]);

    const goToImage = useCallback((index: number) => {
      setCurrentImageIndex(index);
      resetZoom();
    }, []);

    // Zoom controls
    const zoomIn = useCallback(() => {
      const newScale = Math.min(3, scale.get() * 1.5);
      api.start({ scale: newScale });
      setIsZoomed(newScale > 1);
    }, [api, scale]);

    const zoomOut = useCallback(() => {
      const newScale = Math.max(0.5, scale.get() / 1.5);
      api.start({ scale: newScale });
      setIsZoomed(newScale > 1);
    }, [api, scale]);

    const resetZoom = useCallback(() => {
      api.start({ x: 0, y: 0, scale: 1 });
      setIsZoomed(false);
    }, [api]);

    // Swipe gesture handling for image navigation
    const swipeGesture = useGesture({
      onDragEnd: ({ direction: [xDir], distance, velocity }) => {
        // Only trigger swipe if not zoomed and swipe is horizontal
        if (!isZoomed && Math.abs(xDir) > 0.5 && distance > 50 && currentImage.type === 'image') {
          if (xDir > 0) {
            goToPrevious();
          } else {
            goToNext();
          }
        }
      }
    });

    return (
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(true)} // Keep controls visible in lightbox
      >
        {/* Main Image Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-full max-w-4xl max-h-full touch-none"
          {...swipeGesture()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <animated.div
                {...bind()}
                style={{
                  x: currentImage.type === 'image' ? x : 0,
                  y: currentImage.type === 'image' ? y : 0,
                  scale: currentImage.type === 'image' ? scale : 1,
                  cursor: currentImage.type === 'video' ? 'default' : (isZoomed ? 'grab' : 'pointer')
                }}
                className="relative max-w-full max-h-full"
              >
                {currentImage.type === 'video' ? (
                  <video
                    ref={videoRef}
                    src={getCDNUrl(currentImage.src)}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={getCDNUrl(currentImage.src)}
                    alt={currentImage.title}
                    className="max-w-full max-h-full object-contain"
                    draggable={false}
                  />
                )}
              </animated.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {content.images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* Zoom Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls && currentImage.type === 'image' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 z-10 flex flex-col space-y-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          {isZoomed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={20} />
            </button>
          )}
        </motion.div>

        {/* Image Indicators */}
        {content.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2"
          >
            {content.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? 'bg-orange-500'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </motion.div>
        )}

        {/* Image Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 left-4 z-10 bg-black/50 rounded-lg p-4 max-w-sm"
        >
          <h3 className="text-white font-semibold text-lg mb-1">
            {currentImage.title}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            {currentImage.description}
          </p>
          {content.images.length > 1 && (
            <span className="text-gray-400 text-xs">
              {currentImageIndex + 1} of {content.images.length}
            </span>
          )}
        </motion.div>

        {/* Touch Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls && !isZoomed && currentImage.type === 'image' ? 0.7 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 z-10 text-white text-sm bg-black/50 rounded px-3 py-2 md:hidden"
        >
          Swipe to navigate • Pinch to zoom
        </motion.div>

        {/* Video Instructions */}
        {currentImage.type === 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 z-10 text-white text-sm bg-black/50 rounded px-3 py-2 md:hidden"
          >
            Swipe to navigate • Tap video for controls
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-20"
    >
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-primary text-white mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Explore a collection of pyrographic artworks, each piece telling its own unique story through fire and wood.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-1 bg-gray-900 rounded-lg p-1 max-w-2xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                style={selectedCategory === category ? {
                  filter: 'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 69, 0, 0.4))',
                  boxShadow: '0 0 20px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.3)'
                } : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {currentItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onImageClick={(images, initialIndex) => setLightboxContent({ images, initialIndex })}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center mt-16 space-x-4"
            >
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-orange-500 hover:text-white'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    style={currentPage === page ? {
                      filter: 'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))',
                      boxShadow: '0 0 20px rgba(255, 165, 0, 0.6)'
                    } : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-orange-500 hover:text-white'
                }`}
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-8 text-gray-400"
            >
              Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} items
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxContent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxContent(null)}
                className="absolute top-4 right-4 z-20 text-white hover:text-orange-400 transition-colors p-2 bg-black/50 rounded-full"
              >
                <X size={24} />
              </button>
              
              <LightboxViewer content={lightboxContent} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </motion.div>
  );
};

export default Gallery;
