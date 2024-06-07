import * as React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

type Item = {
  id: string;
  name: string;
};

let createItems = (): Item[] =>
  Array.from({ length: 1000 }).map((_, i) => ({
    id: `${i}`,
    name: `Item ${i}`,
  }));


let data = createItems()


export default function App() {
  let [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  let toggleId = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  let renderItem = React.useCallback(
    ({ item }: { item }) => {
      let isSelected = selectedIds.includes(item.id);
      return (
        <FlatlistRow {...item} isSelected={isSelected} toggleId={toggleId} />
      );
    },
    [toggleId, selectedIds]
  );

  return (
    <View style={{ paddingTop: 64 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

const FlatlistRow = React.memo(function FlatlistRow({
  id,
  name,
  isSelected,
  toggleId,
}: {
  id: string;
  name: string;
  isSelected: boolean;
  toggleId: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => toggleId(id)}
    >
      <Text>{name}</Text>

      {isSelected && <Text>Selected</Text>}
    </TouchableOpacity>
  );
});
