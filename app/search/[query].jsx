import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Linking,Modal, Image } from 'react-native';
import { Text, Button, Chip } from '@rneui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import tw from 'twrnc';

// Department data with categories
const DEPARTMENTS = [
  {
    id: 1,
    name: "Accounts Payable / Procurement Management",
    phone: "972-883-2300",
    category: "Administrative",
    email: "onecard@utdallas.edu",
    link: "https://www.utdallas.edu/procurementProcurement",
    keywords: ["payment", "procurement", "finance"],
  },
  {
    id: 2,
    name: "Ackerman Center for Holocaust Studies",
    phone: "972-883-2100",
    category: "Academic",
    email: null,
    link: "https://www.utdallas.edu/ackerman/Ackerman",
    keywords: ["holocaust", "history"],
  },
  {
    id: 3,
    name: "Alan G. MacDiarmid NanoTech Institute",
    phone: "972-883-6530",
    category: "Research",
    email: null,
    link: "https://centers.utdallas.edu/nanotech/NanoTech",
    keywords: ["nanotech", "research"],
  },
  {
    id: 4,
    name: "Apogee Internet & TV",
    phone: "855-465-6750",
    category: "IT Support",
    email: null,
    link: "https://www.myresnet.com/home",
    keywords: ["internet", "wifi"],
  },
  {
    id: 5,
    name: "Help Desk & Computer Labs",
    phone: "972-883-2911",
    category: "IT Support",
    email: "assist@utdallas.edu",
    link: "https://oit.utdallas.edu/helpdesk/",
    keywords: ["IT", "support"],
  },
  {
  id: 6,
  name: "Central Receiving & Mail Services (CRMS)",
  phone: "972-883-2779",
  category: "Administrative",
  email: null,
  link: "https://services.utdallas.edu/mail/",
  keywords: ["mail", "receiving", "shipping"],
},
{
  id: 7,
  name: "Chemistry & Biochemistry",
  phone: "972-883-2901",
  category: "Academic",
  email: null,
  link: "https://chemistry.utdallas.edu/",
  keywords: ["chemistry", "biochemistry", "science"],
},
{
  id: 8,
  name: "Comet Calendar",
  phone: "972-883-4995",
  category: "Campus Services",
  email: null,
  link: "https://calendar.utdallas.edu/",
  keywords: ["calendar", "events"],
},
{
  id: 9,
  name: "Comet Card Office",
  phone: "972-883-2495",
  category: "Campus Services",
  email: null,
  link: "https://cometcard.utdallas.edu/",
  keywords: ["comet card", "student ID"],
},
{
  id: 10,
  name: "Communications / Media Relations / Periodicals",
  phone: "972-883-2155",
  category: "Administrative",
  email: null,
  link: "https://www.utdallas.edu/communications/contact-us/",
  keywords: ["media", "communications", "marketing"],
},
{
  id: 11,
  name: "Confucius Institute",
  phone: "972-883-4860",
  category: "Cultural",
  email: null,
  link: "https://asianstudies.utdallas.edu/",
  keywords: ["asian studies", "culture"],
},
{
  id: 12,
  name: "Corporate Relations",
  phone: "972-883-5387",
  category: "Administrative",
  email: null,
  link: "https://development.utdallas.edu/about/corporate-relations/",
  keywords: ["corporate", "relations", "business"],
},
{
  id: 13,
  name: "Davidson-Gundy Alumni Center",
  phone: "972-883-5393",
  category: "Campus Services",
  email: "dgac@utdallas.edu",
  link: "https://davidson-gundy.utdallas.edu/",
  keywords: ["alumni", "events"],
},
{
  id: 14,
  name: "Dean of Students",
  phone: "972-883-6391",
  category: "Student Services",
  email: "dos@utdallas.edu",
  link: "https://deanofstudents.utdallas.edu/",
  keywords: ["student services", "support"],
},
{
  id: 15,
  name: "Development & Alumni Relations",
  phone: "972-883-2295",
  category: "Administrative",
  email: "development@utdallas.edu",
  link: "https://development.utdallas.edu/",
  keywords: ["alumni", "development", "fundraising"],
},
{
  id: 16,
  name: "Dining Services / Chartwells",
  phone: "972-883-7480",
  category: "Campus Services",
  email: "foodservice@utdallas.edu",
  link: "https://services.utdallas.edu/dining/",
  keywords: ["dining", "food", "catering"],
},
{
  id: 17,
  name: "Diversity & Community Engagement",
  phone: "972-883-6334",
  category: "Administrative",
  email: null,
  link: "https://odei.utdallas.edu/",
  keywords: ["diversity", "community"],
},
{
  id: 18,
  name: "Economic, Political & Policy Sciences (EPPS)",
  phone: "972-883-2935",
  category: "Academic",
  email: "epps@utdallas.edu",
  link: "https://epps.utdallas.edu/",
  keywords: ["epps", "political science", "policy"],
},
{
  id: 19,
  name: "Edith O'Donnell Institute of Art History",
  phone: "972-883-2475",
  category: "Academic",
  email: null,
  link: "https://arthistory.utdallas.edu/",
  keywords: ["art history", "edith o'donnell"],
},
{
  id: 20,
  name: "Educational Technology Services (ETS)",
  phone: "972-883-5918",
  category: "IT Support",
  email: "eLearning@utdallas.edu",
  link: "https://ets.utdallas.edu/",
  keywords: ["education", "technology", "services"],
},
{
  id: 21,
  name: "Einstein Bros Bagels",
  phone: "972-883-7470",
  category: "Dining",
  email: null,
  link: "https://locations.einsteinbros.com/us/tx/richardson/800-loop-road",
  keywords: ["bagels", "food", "breakfast"],
},
{
  id: 22,
  name: "eLearning Help Desk",
  phone: "866-588-3192",
  category: "IT Support",
  email: "eLearning@utdallas.edu",
  link: "https://ets.utdallas.edu/elearning/helpdesk",
  keywords: ["elearning", "help desk", "support"],
},
{
  id: 23,
  name: "Emergency Management",
  phone: "972-883-7669",
  category: "Safety",
  email: null,
  link: "https://www.utdallas.edu/safety/",
  keywords: ["emergency", "management", "safety"],
},
{
  id: 24,
  name: "Engineering & Computer Science (ECS)",
  phone: "972-883-2974",
  category: "Academic",
  email: "engineering@utdallas.edu",
  link: "https://engineering.utdallas.edu/",
  keywords: ["engineering", "computer science"],
},
{
  id: 25,
  name: "Facilities & Economic Development",
  phone: "972-883-2213",
  category: "Administrative",
  email: "fed@utdallas.edu",
  link: "https://fed.utdallas.edu/",
  keywords: ["facilities", "development"],
},
{
  id: 26,
  name: "Financial Aid",
  phone: "972-883-2941",
  category: "Student Services",
  email: "financial-aid@utdallas.edu",
  link: "https://finaid.utdallas.edu/",
  keywords: ["financial aid", "support"],
},
];

const CATEGORIES = [
  "Academic",
  "Administrative",
  "Campus Life",
  "IT Support",
  "Research",
  "Student Services",
];

export default function SearchPage() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
  });

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
            {CATEGORIES.map(category => (
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

          <View style={tw`flex-row justify-between mt-4`}>
            <Button
              title="Reset"
              type="outline"
              buttonStyle={tw`border-[#23603F] px-8`}
              titleStyle={tw`text-[#23603F]`}
              onPress={() => setSelectedFilters({
                category: []
              })}
            />
            <Button
              title="Apply"
              buttonStyle={tw`bg-[#23603F] px-8`}
              onPress={() => setShowFilters(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  // Function to handle clicking on a department suggestion
  const handlePress = (dept) => {
    if (dept.phone) {
      const phoneNumber = dept.phone.replace(/\D/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    } else if (dept.email) {
      Linking.openURL(`mailto:${dept.email}`);
    } else if (dept.link) {
      Linking.openURL(dept.link);
    }
    saveToHistory(dept.name);
  };

  // Function to get matching departments based on query and filters
  const getMatchingDepartments = () => {
    if (!searchQuery.trim()) return [];

    return DEPARTMENTS.filter(dept => {
      const matchesQuery = (
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.phone.includes(searchQuery) ||
        (dept.email && dept.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dept.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      const matchesCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(dept.category);

      return matchesQuery && matchesCategory;
    });
  };

  const matches = getMatchingDepartments();

  const renderSearchSuggestions = () => {
    if (matches.length === 0 || !searchQuery.trim()) return null;
  
    return (
      <View style={tw`absolute top-14 left-0 right-0 mx-4 z-50`}>
        <ScrollView
          style={tw`bg-white rounded-lg shadow-lg max-h-96`}
          keyboardShouldPersistTaps="handled"
        >
          {matches.map((dept, index) => (
            <TouchableOpacity
              key={dept.id}
              style={tw`p-4 border-b border-gray-100 ${index === matches.length - 1 ? 'border-b-0' : ''}`}
              onPress={() => handlePress(dept)}
            >
              <Text style={tw`text-[#23603F] font-semibold`}>{dept.name}</Text>
              <Text style={tw`text-gray-600 text-sm`}>{dept.phone}</Text>
              {dept.email && <Text style={tw`text-gray-500 text-sm`}>{dept.email}</Text>}
              <Text style={tw`text-gray-400 text-xs mt-1`}>{dept.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  



  const saveToHistory = (query) => {
    if (query.trim()) {
      setSearchHistory(prev => {
        const updatedHistory = [query, ...prev.filter(h => h !== query)].slice(0, 5);
        return updatedHistory;
      });
    }
  };
  

  const renderSearchHistory = () => {
    // Only render history when search query is empty
    if (!searchHistory.length || searchQuery.trim()) return null;

    return (
      <ScrollView style={tw`px-4`}>
        <Text style={tw`text-lg font-semibold mb-4 text-[#23603F]`}>
          Recent Searches
        </Text>
        {searchHistory.map((item, index) => {
          const dept = DEPARTMENTS.find(d => 
            d.name.toLowerCase() === item.toLowerCase()
          );
          
          return (
            <TouchableOpacity 
              key={index}
              style={tw`bg-white rounded-lg p-4 mb-2 shadow-sm`}
              onPress={() => handleHistoryItemPress(item)}
            >
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-[#23603F] font-semibold`}>{item}</Text>
                  {dept && (
                    <>
                      <Text style={tw`text-gray-600 text-sm mt-1`}>
                        {dept.phone}
                      </Text>
                      {dept.email && (
                        <Text style={tw`text-gray-500 text-sm`}>
                          {dept.email}
                        </Text>
                      )}
                      <Text style={tw`text-gray-400 text-xs mt-1`}>
                        {dept.category}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 pt-4`}>
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`flex-1 flex-row items-center bg-white rounded-lg px-4 py-2 shadow-sm`}>
          <Image 
              source={icons.search}
              style={[tw`w-5 h-5 mr-2`, { tintColor: '#23603F' }]}
            />
            <TextInput
              style={tw`flex-1 text-base`}
              placeholder="Search departments or phone numbers..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
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

        {renderSearchSuggestions()}
      </View>

      {renderSearchHistory()}

      <FilterModal />
    </SafeAreaView>
  );
}
