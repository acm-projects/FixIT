const SortDropdown = () => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  
    return (
      <View className="relative">
        <Pressable
          onPress={() => setShowSortDropdown(!showSortDropdown)}
          className="flex-row items-center space-x-2 py-2 px-3 bg-black bg-opacity-5 rounded-md"
          style={{backgroundColor: '#D2BE92'}}
        >
          <Text style={{color: '#23603F'}} className="text-lg font-medium">
            {selectedSort.label}
          </Text>
          <Icon 
            name={showSortDropdown ? "chevron-up" : "chevron-down"} 
            type="feather" 
            size={20} 
            color="#23603F" 
          />
        </Pressable>
        
        {showSortDropdown && (
          <Pressable
            className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen"
            onPress={() => setShowSortDropdown(false)}
          >
            <View 
              style={{
                backgroundColor: '#1c1c1c',
                borderRadius: 8,
                position: 'absolute',
                top: 45,
                left: 10,
                right: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  className="py-3 px-4 flex-row items-center justify-between"
                  onPress={() => {
                    setSelectedSort(option);
                    setShowSortDropdown(false);
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                  }}
                >
                  <Text 
                    style={{
                      color: option.value === selectedSort.value ? '#ffffff' : '#cccccc',
                      fontWeight: option.value === selectedSort.value ? '600' : '400',
                    }}
                    className="text-base"
                  >
                    {option.label}
                  </Text>
                  {option.value === selectedSort.value && (
                    <Icon name="check" type="feather" size={18} color="#ffffff" />
                  )}
                </Pressable>
              ))}
            </View>
          </Pressable>
        )}
      </View>
    );
  };