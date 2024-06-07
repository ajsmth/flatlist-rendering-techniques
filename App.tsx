import * as React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { create } from "zustand";

type Item = {
  id: string;
  name: string;
};

let createItems = (): Item[] =>
  Array.from({ length: 1000 }).map((_, i) => ({
    id: `${i}`,
    name: `Item ${i}`,
  }));

let data = createItems();

type SelectedIdsStore = {
  selectedIds: Record<string, boolean>;
};

let useSelectedIdsStore = create<SelectedIdsStore>((set) => ({
  selectedIds: {},
}));

let useIsItemSelected = (id: string) =>
  useSelectedIdsStore((state) => state.selectedIds[id]);

let toggleId = (id: string) =>
  useSelectedIdsStore.setState((state) => {
    return {
      selectedIds: {
        ...state.selectedIds,
        [id]: !state.selectedIds[id],
      },
    };
  });

export default function App() {
  let renderItem = React.useCallback(({ item }: { item: Item }) => {
    return <FlatlistRow {...item} toggleId={toggleId} />;
  }, []);

  return (
    <View style={{ paddingTop: 64 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

const FlatlistRow = React.memo(function FlatlistRow({
  id,
  name,
  toggleId,
}: {
  id: string;
  name: string;
  toggleId: (id: string) => void;
}) {
  let isSelected = useIsItemSelected(id);

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
