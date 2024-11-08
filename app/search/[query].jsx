// search/[query].jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Text, Button, Chip } from '@rneui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { icons } from '../../constants';

// Mock data
const MOCK_SERVICES = [
  { 
    id: 1, 
    title: 'Classroom Technology Support', 
    category: 'Academic',
    rating: 4.5, 
    price: 'Free',
    description: 'Support for classroom technology including projectors, computers, and audio systems'
  },
  { 
    id: 2, 
    title: 'Desktop Support', 
    category: 'Support',
    rating: 4.8, 
    price: 'Free',
    description: 'On-site and remote support for university-owned computers'
  },
  { 
    id: 3, 
    title: 'Email Services', 
    category: 'Communication',
    rating: 4.7, 
    price: 'Free',
    description: 'Microsoft 365 email and calendar services for students and staff'
  },
  { 
    id: 4, 
    title: 'Network Access', 
    category: 'Network',
    rating: 4.6, 
    price: 'Free',
    description: 'WiFi access and network connectivity across campus'
  },
  { 
    id: 5, 
    title: 'Password Reset', 
    category: 'Account',
    rating: 4.9, 
    price: 'Free',
    description: 'NetID and password reset services'
  },
  { 
    id: 6, 
    title: 'Software Distribution', 
    category: 'Software',
    rating: 4.7, 
    price: 'Varies',
    description: 'Access to university-licensed software including Microsoft Office and Adobe Creative Cloud'
  },
  { 
    id: 7, 
    title: 'Virtual Lab', 
    category: 'Academic',
    rating: 4.5, 
    price: 'Free',
    description: 'Remote access to computer lab software and resources'
  },
  { 
    id: 8, 
    title: 'eLearning Support', 
    category: 'Academic',
    rating: 4.8, 
    price: 'Free',
    description: 'Support for Canvas and other online learning tools'
  },
  { 
    id: 9, 
    title: 'Print Services', 
    category: 'General',
    rating: 4.4, 
    price: 'Paid',
    description: 'Campus printing services and print station locations'
  },
  { 
    id: 10, 
    title: 'VPN Access', 
    category: 'Network',
    rating: 4.6, 
    price: 'Free',
    description: 'Secure remote access to university resources'
  },
  {
    id: 11,
    title: 'Galaxy Portal Support',
    category: 'Account',
    rating: 4.7,
    price: 'Free',
    description: 'Support for student and employee self-service portal'
  },
  {
    id: 12,
    title: 'Mobile Device Support',
    category: 'Support',
    rating: 4.5,
    price: 'Free',
    description: 'Help with university email and apps on mobile devices'
  }
];

// Update categories array to match new mock data
const categories = [
  'Academic',
  'Support',
  'Communication',
  'Network',
  'Account',
  'Software',
  'General'
];

// Update price ranges to match university services
const priceRanges = ['Free', 'Paid', 'Varies'];


export default function SearchPage() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: null,
    rating: null,
  });

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-100);

  // Categories for filters
  const categories = [
    'Academic', 'Communication', 'Software', 'Painting', 
    'HVAC', 'Roofing'
  ];

  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const saveToHistory = (query) => {
    if (query.trim()) {
      setSearchHistory(prev => {
        const updatedHistory = [query, ...prev.filter(h => h !== query)].slice(0, 5);
        return updatedHistory;
      });
    }
  };

  const filterResults = (text) => {
    const filtered = MOCK_SERVICES.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase());

      const matchesCategory = 
        selectedFilters.category.length === 0 || 
        selectedFilters.category.includes(item.category);

      const matchesPrice = 
        !selectedFilters.priceRange || 
        item.price === selectedFilters.priceRange;

      const matchesRating = 
        !selectedFilters.rating || 
        item.rating >= selectedFilters.rating;

      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });

    return filtered;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (text.trim() === '') {
        setSearchResults([]);
      } else {
        const filtered = filterResults(text);
        setSearchResults(filtered);
        saveToHistory(text);
      }
      setIsLoading(false);
    }, 500);
  };

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={tw`flex-1 bg-black bg-opacity-50`}>
        <View style={tw`absolute bottom-0 w-full bg-white rounded-t-3xl p-6`}>
          <View style={tw`items-center mb-4`}>
            <View style={tw`w-10 h-1 bg-gray-300 rounded-full`} />
          </View>
          
          <Text style={tw`text-xl font-bold mb-4 text-[#23603F]`}>Filters</Text>
          
          <Text style={tw`font-semibold mb-2`}>Categories</Text>
          <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
            {categories.map(category => (
              <Chip
                key={category}
                title={category}
                type={selectedFilters.category.includes(category) ? "solid" : "outline"}
                onPress={() => {
                  setSelectedFilters(prev => ({
                    ...prev,
                    category: prev.category.includes(category)
                      ? prev.category.filter(c => c !== category)
                      : [...prev.category, category]
                  }));
                }}
                containerStyle={tw`mb-2`}
                buttonStyle={selectedFilters.category.includes(category) 
                  ? tw`bg-[#23603F]` 
                  : tw`bg-white border-[#23603F]`
                }
              />
            ))}
          </View>

          <Text style={tw`font-semibold mb-2`}>Price Range</Text>
          <View style={tw`flex-row gap-2 mb-4`}>
            {priceRanges.map(price => (
              <Chip
                key={price}
                title={price}
                type={selectedFilters.priceRange === price ? "solid" : "outline"}
                onPress={() => setSelectedFilters(prev => ({
                  ...prev,
                  priceRange: prev.priceRange === price ? null : price
                }))}
                buttonStyle={selectedFilters.priceRange === price 
                  ? tw`bg-[#23603F]` 
                  : tw`bg-white border-[#23603F]`
                }
              />
            ))}
          </View>

          <Text style={tw`font-semibold mb-2`}>Minimum Rating</Text>
          <View style={tw`flex-row gap-2 mb-4`}>
            {ratings.map(rating => (
              <Chip
                key={rating}
                title={`${rating}★`}
                type={selectedFilters.rating === rating ? "solid" : "outline"}
                onPress={() => setSelectedFilters(prev => ({
                  ...prev,
                  rating: prev.rating === rating ? null : rating
                }))}
                buttonStyle={selectedFilters.rating === rating 
                  ? tw`bg-[#23603F]` 
                  : tw`bg-white border-[#23603F]`
                }
              />
            ))}
          </View>

          <View style={tw`flex-row justify-between mt-4`}>
            <Button
              title="Reset"
              type="outline"
              buttonStyle={tw`border-[#23603F] px-8`}
              titleStyle={tw`text-[#23603F]`}
              onPress={() => setSelectedFilters({
                category: [],
                priceRange: null,
                rating: null
              })}
            />
            <Button
              title="Apply"
              buttonStyle={tw`bg-[#23603F] px-8`}
              onPress={() => {
                setShowFilters(false);
                handleSearch(searchQuery);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderSearchItem = ({ item }) => (
    <Animated.View
      style={[
        tw`bg-white rounded-lg shadow-sm mx-4 mb-4 p-4`,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity 
        onPress={() => router.push(`/postDetail/${item.id}`)}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-semibold text-[#23603F]`}>{item.title}</Text>
            <Text style={tw`text-sm text-gray-600`}>{item.category}</Text>
            <View style={tw`flex-row items-center mt-1`}>
              <Text style={tw`text-sm text-gray-600 mr-2`}>{item.price}</Text>
              <Text style={tw`text-sm text-gray-600`}>★ {item.rating}</Text>
            </View>
          </View>
          <Image 
            source={icons.chevronRight}
            style={[tw`w-5 h-5`, { tintColor: '#23603F' }]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`flex-1 flex-row items-center bg-white rounded-lg px-4 py-2 shadow-sm`}>
            <Image 
              source={icons.search}
              style={[tw`w-5 h-5 mr-2`, { tintColor: '#23603F' }]}
            />
            <TextInput
              style={tw`flex-1 text-base`}
              placeholder="Search for services..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Image 
                  source={icons.close}
                  style={[tw`w-5 h-5`, { tintColor: '#23603F' }]}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={tw`bg-white p-2 rounded-lg shadow-sm`}
            onPress={() => setShowFilters(true)}
          >
            <Image 
              source={icons.filter}
              style={[tw`w-6 h-6`, { tintColor: '#23603F' }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#23603F" />
        </View>
      ) : searchQuery.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View style={tw`p-4 items-center`}>
              <Text style={tw`text-gray-500`}>No results found</Text>
            </View>
          }
        />
      ) : (
        <View style={tw`p-4`}>
          {searchHistory.length > 0 && (
            <>
              <Text style={tw`text-lg font-semibold mb-2 text-[#23603F]`}>Recent Searches</Text>
              {searchHistory.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={tw`flex-row items-center py-3 border-b border-gray-200`}
                  onPress={() => handleSearch(item)}
                >
                  <Image 
                    source={icons.history}
                    style={[tw`w-5 h-5 mr-3`, { tintColor: '#666' }]}
                  />
                  <Text style={tw`text-gray-600`}>{item}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      )}

      <FilterModal />
    </SafeAreaView>
  );
}