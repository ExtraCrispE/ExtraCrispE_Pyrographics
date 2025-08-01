import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Flame } from 'lucide-react';

const FloatingContactButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed right-0 bottom-20 z-50">
      <Link
        to="/#contact"
        className="group relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label="Contact us for custom pyrography work"
      >
        {/* Expanded message */}
        <div
          className={`
            absolute right-16 top-1/2 transform -translate-y-1/2
            bg-gradient-to-r from-orange-600 to-red-600 text-white
            px-4 py-3 rounded-l-lg shadow-2xl
            transition-all duration-500 ease-out
            whitespace-nowrap text-sm font-medium
            ${isHovered 
              ? 'opacity-100 translate-x-0 visible' 
              : 'opacity-0 translate-x-4 invisible'
            }
          `}
          style={{
            filter: isHovered 
              ? 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.6))' 
              : 'none'
          }}
        >
          Nothing hot enough for you? Let's talk.
          
          {/* Arrow pointing to button */}
          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
            <div className="w-0 h-0 border-l-8 border-l-red-600 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
          </div>
        </div>

        {/* Main button */}
        <div
          className={`
            relative bg-gradient-to-br from-orange-500 to-red-600
            rounded-l-full shadow-2xl
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-4 focus:ring-orange-400/50
            ${isHovered 
              ? 'w-20 h-20 pr-6 pl-4' 
              : 'w-16 h-16 pr-4 pl-3'
            }
          `}
          style={{
            filter: `
              drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))
              drop-shadow(0 0 40px rgba(255, 69, 0, 0.4))
            `,
            animation: 'floating-pulse 2s ease-in-out infinite'
          }}
        >
          {/* Background glow effect */}
          <div 
            className="absolute inset-0 rounded-l-full bg-gradient-to-br from-orange-400 to-red-500 opacity-75"
            style={{
              animation: 'floating-glow 3s ease-in-out infinite alternate'
            }}
          />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center h-full">
            <div className="flex items-center space-x-1">
              <Flame 
                className={`
                  text-white transition-all duration-300
                  ${isHovered ? 'w-6 h-6' : 'w-5 h-5'}
                `}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
                }}
              />
              <MessageCircle 
                className={`
                  text-white transition-all duration-300
                  ${isHovered ? 'w-5 h-5 opacity-100' : 'w-4 h-4 opacity-80'}
                `}
              />
            </div>
          </div>

          {/* Ripple effect on hover */}
          <div 
            className={`
              absolute inset-0 rounded-l-full border-2 border-white/30
              transition-all duration-500
              ${isHovered 
                ? 'scale-110 opacity-0' 
                : 'scale-100 opacity-100'
              }
            `}
          />
        </div>
      </Link>
    </div>
  );
};

export default FloatingContactButton;