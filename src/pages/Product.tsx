import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw,
  ZoomIn,
  Minus,
  Plus
} from 'lucide-react';
import { getCDNUrl } from '../utils/constants';

const Product: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data (in real app, fetch based on id)
  const product = {
    id: 1,
    title: 'Black and Gold Collection',
    category: 'Anime',
    price: 380,
    originalPrice: 420,
    rating: 5,
    reviews: 12,
    inStock: true,
    description: 'A stunning pyrographic masterpiece featuring elegant anime artwork with gold foil accents. This piece showcases intricate character details and dramatic shading that brings the subject to life. Created on premium basswood with meticulous attention to every detail and finished with genuine gold leaf accents.',
    features: [
      'Hand-burned on premium basswood',
      'Genuine gold foil accents',
      'Dimensions: 12" x 16"',
      'Sealed with protective finish',
      'Ready to hang with included hardware',
      'Certificate of authenticity included'
    ],
    images: [
      { id: 1, title: 'Black and Gold Main', description: 'Main artwork with gold highlights', src: '/Store/Anime/BlackandGold/BlackAndGold.jpg', type: 'image' },
      { id: 2, title: 'Black and Gold Detail 1', description: 'Detailed character work', src: '/Store/Anime/BlackandGold/BlackAndGold2.jpg', type: 'image' },
      { id: 3, title: 'Black and Gold Detail 2', description: 'Gold foil accent work', src: '/Store/Anime/BlackandGold/BlackAndGold3.jpg', type: 'image' },
      { id: 4, title: 'Black and Gold Detail 3', description: 'Character expression detail', src: '/Store/Anime/BlackandGold/BlackAndGold4.jpg', type: 'image' },
      { id: 5, title: 'Black and Gold Detail 4', description: 'Additional detail work', src: '/Store/Anime/BlackandGold/BlackAndGold5.jpg', type: 'image' },
      { id: 6, title: 'Black and Gold Detail 5', description: 'Final artwork showcase', src: '/Store/Anime/BlackandGold/BlackAndGold6.jpg', type: 'image' }
    ],
    specifications: {
      'Material': 'Premium Basswood',
      'Dimensions': '12" x 16" x 0.75"',
      'Finish': 'Protective Clear Coat with Gold Foil',
      'Hanging': 'Ready to Hang',
      'Certificate': 'Included'
    }
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely stunning piece! The detail work is incredible and it looks even better in person. Fast shipping and excellent packaging.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 5,
      date: '1 month ago',
      comment: 'Amazing craftsmanship! The gold accents really make this piece pop. Highly recommend!'
    }
  ];

  const relatedProducts = [
    { id: 2, title: 'Forest Guardian', price: 380, category: 'Nature', image: '/Gallery/Nature/Eagle/Eagle.jpg' },
    { id: 3, title: 'Mountain Vista', price: 520, category: 'Nature', image: '/Gallery/Anime/BlackandGold/face.jpg' },
    { id: 4,
      title: 'Demon Slayer Coaster', 
      price: 45, 
      category: 'Anime', 
      image: '/Store/Anime/DemonSlayer/DSCoster/D_S_Coster.jpg' 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-20"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/shop" className="hover:text-orange-400 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg wood-texture mb-4 group cursor-zoom-in">
                {product.images && product.images.length > 0 ? (
                  product.images[selectedImage].type === 'video' ? (
                    <video
                      src={getCDNUrl(product.images[selectedImage].src)}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={getCDNUrl(product.images[selectedImage].src)}
                      alt={product.images[selectedImage].title}
                      className="w-full h-full object-cover rounded-lg"
                      draggable={false}
                      loading="lazy"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold mb-2">{product.title}</div>
                      <div className="text-gray-300">Main Product Image</div>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images && product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg wood-texture border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-orange-500'
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    {image.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <img
                          src={getCDNUrl(image.thumbnail || image.src)}
                          alt={image.title}
                          className="w-full h-full object-cover rounded-lg"
                          draggable={false}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={getCDNUrl(image.src)}
                        alt={image.title}
                        className="w-full h-full object-cover rounded-lg"
                        draggable={false}
                        loading="lazy"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="heading-secondary text-white mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 text-white border-x border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 border border-gray-700 rounded-lg transition-colors ${
                    isWishlisted
                      ? 'text-red-400 border-red-400'
                      : 'text-gray-400 hover:text-red-400 hover:border-red-400'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Free Shipping</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Authenticity</div>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">30-Day Return</div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-sm">In Stock - Ready to Ship</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="heading-tertiary text-white mb-8">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Care Instructions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Dust gently with a soft, dry cloth</li>
                <li>• Avoid direct sunlight for extended periods</li>
                <li>• Keep away from moisture and humidity</li>
                <li>• Handle with care to preserve finish</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="heading-tertiary text-white mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-semibold">{review.name}</div>
                    <div className="text-gray-400 text-sm">{review.date}</div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="heading-tertiary text-white mb-8">Related Artwork</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="bg-black rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-orange-900/30 to-red-900/30 wood-texture">
                    <img
                      src={getCDNUrl(relatedProduct.image)}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">
                        ${relatedProduct.price}
                      </span>
                      <span className="text-orange-400 text-sm">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Product;
