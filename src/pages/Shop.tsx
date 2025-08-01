import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Filter } from 'lucide-react';
import { getCDNUrl } from '../utils/constants';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const ITEMS_PER_PAGE = 12;

  const categories = ['All', 'Nature', 'Symbolic', 'Anime'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Mock product data
  const products = [
    {
      id: 1,
      title: 'Black and Gold Collection',
      category: 'Anime',
      price: 380,
      originalPrice: 420,
      rating: 5,
      reviews: 12,
      isNew: true,
      isFeatured: true,
      description: 'Elegant anime artwork with stunning gold foil accents and intricate detail work',
      images: [
        { id: 1, title: 'Black and Gold Main', description: 'Main artwork with gold highlights', src: '/Store/Anime/BlackandGold/BlackAndGold.jpg', type: 'image' },
        { id: 2, title: 'Black and Gold Detail 1', description: 'Detailed character work', src: '/Store/Anime/BlackandGold/BlackAndGold2.jpg', type: 'image' },
        { id: 3, title: 'Black and Gold Detail 2', description: 'Gold foil accent work', src: '/Store/Anime/BlackandGold/BlackAndGold3.jpg', type: 'image' },
        { id: 4, title: 'Black and Gold Detail 3', description: 'Character expression detail', src: '/Store/Anime/BlackandGold/BlackAndGold4.jpg', type: 'image' }
      ]
    },
    {
      id: 2,
      title: 'Demon Slayer Coaster',
      category: 'Anime',
      price: 45,
      rating: 4.8,
      reviews: 8,
      isFeatured: true,
      description: 'Beautiful Demon Slayer themed coaster with intricate character details',
      images: [
        { id: 1, title: 'DS Coaster Main', description: 'Demon Slayer coaster design', src: '/Store/Anime/DemonSlayer/DSCoster/D_S_Coster.jpg', type: 'image' }
      ]
    },
    {
      id: 3,
      title: 'Abstract Art Collection',
      category: 'Symbolic',
      price: 280,
      rating: 4.9,
      reviews: 15,
      description: 'Flowing abstract patterns and geometric designs in pyrography',
      images: [
        { id: 1, title: 'Abstract Design 1', description: 'Flowing abstract patterns', src: '/Store/Symbolic/Abstract/Abstract1.jpg', type: 'image' },
        { id: 2, title: 'Abstract Design 2', description: 'Geometric abstract work', src: '/Store/Symbolic/Abstract/Abstract3.jpg', type: 'image' },
        { id: 3, title: 'Abstract Design 3', description: 'Complex abstract composition', src: '/Store/Symbolic/Abstract/Abstract4.jpg', type: 'image' }
      ]
    },
    {
      id: 4,
      title: 'Breath of the Wild Collection',
      category: 'Anime',
      price: 450,
      rating: 5,
      reviews: 6,
      isNew: true,
      description: 'Epic Legend of Zelda: Breath of the Wild landscape and character artwork',
      images: [
        { id: 1, title: 'BotW Main', description: 'Main BotW landscape artwork', src: '/Store/Anime/LOZ/BotW/BotW.jpg', type: 'image' },
        { id: 2, title: 'BotW Scene 1', description: 'Detailed environment work', src: '/Store/Anime/LOZ/BotW/BotW1.jpg', type: 'image' },
        { id: 3, title: 'BotW Scene 2', description: 'Character in landscape', src: '/Store/Anime/LOZ/BotW/BotW2.jpg', type: 'image' }
      ]
    },
    {
      id: 5,
      title: 'Link Character Portrait',
      category: 'Anime',
      price: 320,
      rating: 4.9,
      reviews: 9,
      isFeatured: true,
      description: 'Detailed Link character portrait with equipment and clothing details',
      images: [
        { id: 1, title: 'Link Portrait', description: 'Main Link character portrait', src: '/Store/Anime/LOZ/Link/Link.jpg', type: 'image' },
        { id: 2, title: 'Link Detail 1', description: 'Character detail work', src: '/Store/Anime/LOZ/Link/Link1.jpg', type: 'image' },
        { id: 3, title: 'Link Detail 2', description: 'Equipment and clothing details', src: '/Store/Anime/LOZ/Link/Link2.jpg', type: 'image' }
      ]
    },
    {
      id: 6,
      title: 'Princess Zelda Portrait',
      category: 'Anime',
      price: 340,
      originalPrice: 380,
      rating: 4.7,
      reviews: 11,
      description: 'Elegant Princess Zelda character artwork with dress and accessory details',
      images: [
        { id: 1, title: 'Zelda Portrait', description: 'Main Zelda character portrait', src: '/Store/Anime/LOZ/Zelda/Zelda.jpg', type: 'image' },
        { id: 2, title: 'Zelda Detail 1', description: 'Character detail work', src: '/Store/Anime/LOZ/Zelda/Zelda1.jpg', type: 'image' },
        { id: 3, title: 'Zelda Detail 2', description: 'Dress and accessories detail', src: '/Store/Anime/LOZ/Zelda/Zelda2.jpg', type: 'image' }
      ]
    },
    {
      id: 7,
      title: 'Ganon Villain Collection',
      category: 'Anime',
      price: 420,
      rating: 4.8,
      reviews: 7,
      description: 'Powerful Ganon villain artwork with dramatic detail work',
      images: [
        { id: 1, title: 'Ganon Portrait 1', description: 'Main Ganon villain artwork', src: '/Store/Anime/LOZ/Ganon/Ganon1.jpg', type: 'image' },
        { id: 2, title: 'Ganon Portrait 2', description: 'Alternative Ganon view', src: '/Store/Anime/LOZ/Ganon/Ganon2.jpg', type: 'image' },
        { id: 3, title: 'Ganon Portrait 3', description: 'Detailed villain work', src: '/Store/Anime/LOZ/Ganon/Ganon3.jpg', type: 'image' }
      ]
    },
    {
      id: 8,
      title: 'Commemorative Plaque',
      category: 'Symbolic',
      price: 180,
      rating: 4.7,
      reviews: 5,
      description: 'Custom commemorative plaque with elegant design work',
      images: [
        { id: 1, title: 'Memorial Plaque', description: 'Custom commemorative plaque work', src: '/Store/Symbolic/Plaque/Plaque.jpg', type: 'image' }
      ]
    },
    {
      id: 9,
      title: 'Elegant Bookmarkers',
      category: 'Symbolic',
      price: 25,
      rating: 4.9,
      reviews: 18,
      isNew: true,
      description: 'Beautiful pyrography bookmarkers with decorative designs',
      images: [
        { id: 1, title: 'Bookmarker Design 1', description: 'Decorative bookmarker', src: '/Store/Symbolic/Bookmarker/BookMarker.jpg', type: 'image' },
        { id: 2, title: 'Bookmarker Design 2', description: 'Alternative bookmarker design', src: '/Store/Symbolic/Bookmarker/BookMarker2.jpg', type: 'image' }
      ]
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
            Shop Artwork
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Discover unique pyrographic artworks, each piece handcrafted with passion and precision.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filter */}
            <div className="flex items-center space-x-1 bg-gray-900 rounded-lg p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
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
              
              {/* Custom Work Button - Links to Contact */}
              <button
                onClick={() => navigate('/#contact')}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-gray-800 border-l border-gray-700 ml-2"
              >
                Custom Work
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-orange-900/30 to-red-900/30 wood-texture">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-red-400 transition-colors">
                      <Heart size={20} />
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn-primary"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* Placeholder content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={getCDNUrl(product.images[0].src)}
                          alt={product.images[0].title}
                          className="w-full h-full object-cover"
                          draggable={false}
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center text-white">
                          <div className="text-lg font-semibold mb-2">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-300">
                            {product.description}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold text-lg">
                        {product.title}
                      </h3>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                        {product.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xl">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-secondary text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-8">
              Be the first to know about new artwork releases and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Shop;
