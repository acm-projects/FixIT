import React, { useState } from 'react'
import { View, TextInput, Text, Pressable, FlatList } from 'react-native'

const TagsInput = () => {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState("")

  const addTag = () => {
    if (input.trim()) {
      setTags([...tags, { id: Date.now().toString(), text: input.trim() }])
      setInput("")
    }
  }

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <View className="flex flex-start w-full h-svh gap-2 p-2">
      <Text className="text-4xl">Add Tags</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addTag} 
        placeholder="Type a tag and press enter"
        className="border border-gray-300 shadow-lg bg-white text-xl rounded-md w-full p-2 mb-2"
      />

    <FlatList
        data={tags}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2">
            <Text className="text-xl text-gray-700">{item.text}</Text>
            <Pressable onPress={() => removeTag(item.id)}>
              <Text className="text-xl text-gray-500 ml-2">✕</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

export default TagsInput
