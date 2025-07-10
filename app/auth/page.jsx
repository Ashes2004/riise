"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Mail, Lock, User, Building2, Lightbulb, Rocket, Award } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RIISEAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  
    const router = useRouter();
  
    useEffect(() => {
      // Check if 'user_session' cookie exists
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const hasSession = cookies.some((cookie) =>
        cookie.startsWith("user_session=")
      );
  
      if (hasSession) {
        router.push("/"); // Redirect to /auth if no session cookie
      }
    }, []);
//   const base_url = 'http://127.0.0.1:8000';
  const base_url = 'https://riise.onrender.com';

  // Slider images with research/innovation theme
  const sliderImages = [
    {
      title: "Research Innovation",
      subtitle: "Advancing knowledge through cutting-edge research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
    },
    {
      title: "Intellectual Property",
      subtitle: "Protecting and managing innovative ideas",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      title: "Startup Ecosystem",
      subtitle: "Nurturing entrepreneurial ventures",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop"
    },
    {
      title: "Innovation Tracking",
      subtitle: "Monitoring progress and breakthrough moments",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  setLoading(true);
  setMessage('');

  try {
    const endpoint = isLogin ? '/api/v1/users/login' : '/api/v1/users/signup';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(`${base_url}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`${isLogin ? 'Login' : 'Registration'} successful!`);
      console.log('Success:', data);

      // Set cookie that expires in 3600 seconds (1 hour)
      const expires = new Date(Date.now() + 3600 * 1000).toUTCString();
      document.cookie = `user_session=${data.token || 'dummy_token'}; expires=${expires}; path=/;`;
      router.push('/');

    } else {
      setMessage(data.message || `${isLogin ? 'Login' : 'Registration'} failed`);
    }
  } catch (error) {
    setMessage('Network error. Please try again.');
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};


  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setMessage('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)',
      }}
    >
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Left Side - Image Slider */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
            
            {/* Slider Container */}
            <div className="relative h-full">
              {sliderImages.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Slider Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-20 left-8 right-8 z-20 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-8 h-8 text-purple-400" />
                <Lightbulb className="w-8 h-8 text-blue-400" />
                <Rocket className="w-8 h-8 text-green-400" />
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold mb-2">{sliderImages[currentSlide].title}</h2>
              <p className="text-lg opacity-90">{sliderImages[currentSlide].subtitle}</p>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              
              {/* Logo & Title */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-white rounded-2xl flex items-center justify-center">
                    <Image src="https://i.ibb.co/wh4CtXq7/RIISE-Logo-White.png" alt="RIISE Logo" width={40} height={40} className="h-16 w-16" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to RIISE</h1>
                <p className="text-gray-300">Research Innovation, IPR & Startup Tracking Portal</p>
              </div>

              {/* Auth Toggle */}
              <div className="flex bg-white/10 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-center rounded-lg transition-all ${
                    isLogin ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-center rounded-lg transition-all ${
                    !isLogin ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                
                {/* Name Field (Registration only) */}
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required={!isLogin}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a0613 10%, #150d27 25%, #1a0f2e 50%, #0a0613 75%, #150d27 100%)",
                  }}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                </button>

                {/* Message */}
                {message && (
                  <div className={`text-center p-3 rounded-lg ${
                    message.includes('successful') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                {/* Switch Mode */}
                <div className="text-center">
                  <span className="text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {isLogin ? 'Register' : 'Login'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RIISEAuthPage;