import * as React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { create, createStore, useStore } from "zustand";

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

function createSelectedIdsStore() {
  let store = createStore<SelectedIdsStore>(() => {
    return {
      selectedIds: {},
    };
  });

  return store;
}

let StoreContext = React.createContext(createSelectedIdsStore());

let useIsItemSelected = (id: string) => {
  let storeContext = React.useContext(StoreContext);
  return useStore(storeContext, (state) => state.selectedIds[id]);
};

function createSelectedIdsStore() {
  let store = createStore<SelectedIdsStore>(() => {
    return {
      selectedIds: {},
    };
  });

  return store;
}

let StoreContext = React.createContext(createSelectedIdsStore());

let useIsItemSelected = (id: string) => {
  let storeContext = React.useContext(StoreContext);
  return useStore(storeContext, (state) => state.selectedIds[id]);
};

export default function App() {
  let storeRef = React.useRef(createSelectedIdsStore());

  let toggleId = React.useCallback((id: string) => {
    storeRef.current.setState((state) => {
      return {
        selectedIds: {
          ...state.selectedIds,
          [id]: !state.selectedIds[id],
        },
      };
    });
  }, [])

  let renderItem = React.useCallback(({ item }: { item: Item }) => {
    return <FlatlistRow {...item} toggleId={toggleId} />;
  }, [toggleId]);

  return (
    <StoreContext.Provider value={storeRef.current}>
      <View style={{ paddingTop: 64 }}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </StoreContext.Provider>
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
