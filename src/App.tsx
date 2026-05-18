import React from 'react';
import { ActivityIndicator, Dimensions, DrawerLayoutAndroid, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from './utils/db';
import { ListCard } from './components/ListCard';
import type { Voter } from './types';
import NavigationView from './components/NavigationView';

const CONNECTION_LABELS: Record<string, string> = {
  connecting: 'authenticating',
  opened: 'authenticating',
  authenticated: 'connected',
  closed: 'closed',
  errored: 'errored',
};

function ConnectionBanner({ visible }: { visible: boolean }) {
  if (visible) return null;
  return (
    <View style={styles.connectionBanner}>
      <Text style={styles.connectionBannerText}>
        Connection lost, check your internet connection
      </Text>
    </View>
  );
}

function SearchBar({
  value,
  onChange,
  drawerRef
}: {
  value: string;
  onChange: (v: string) => void;
  drawerRef: React.RefObject<DrawerLayoutAndroid | null>
}) {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity style={styles.filterButton} onPress={() => drawerRef.current?.openDrawer()}>
        <Image
          source={require('../assets/menu.png')}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="নাম | আইডি নং | ক্রমিক নং | গ্রাম"
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity disabled style={styles.filterButton}>
        <Image
          source={require('../assets/sliders-horizontal.png')}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

function SearchResultLabel({ query }: { query: string }) {
  if (!query) return null;
  return (
    <Text style={styles.searchResultLabel}>
      অনুসন্ধান ফলাফল "{query}"
    </Text>
  );
}

function EmptyState({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Text style={styles.emptyState}>কোন ফলাফল পাওয়া যায়নি</Text>
  );
}

function Footer({
  canLoadNextPage,
  isLoading,
  isEmpty,
}: {
  canLoadNextPage: boolean;
  isLoading: boolean;
  isEmpty: boolean;
}) {
  if (canLoadNextPage) {
    return <ActivityIndicator style={styles.footerLoader} size="small" color="#0000ff" />;
  }
  if (isLoading || isEmpty) return null;
  return <Text style={styles.footerText}>আর কোন ফলাফল নেই</Text>;
}

export default function App() {
  const drawer = React.useRef<DrawerLayoutAndroid>(null)
  const [searchQuery, setSearchQuery] = React.useState('');
  const status = db.useConnectionStatus();
  const connectionState = CONNECTION_LABELS[status] ?? 'unexpected state';

  const query = React.useMemo(
    () =>
      searchQuery
        ? {
          voterLists: {
            $: {
              where: {
                or: [
                  { name: { $ilike: `%${searchQuery}%` } },
                  { serial: { $ilike: `%${searchQuery}%` } },
                ]
              }
            }
          }
        }
        : { voterLists: { $: { limit: 20 } } },
    [searchQuery],
  );

  const { data, error, isLoading, loadNextPage, canLoadNextPage } =
    db.useInfiniteQuery(query);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const voters: Voter[] | undefined = data?.voterLists;
  const isEmpty = voters?.length === 0;
  const showConnectionWarning = connectionState !== 'connected';

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={Dimensions.get('screen').width - 50}
      drawerPosition='left'
      renderNavigationView={() => <NavigationView />}
    >
      <View style={styles.container}>
        <ConnectionBanner visible={!showConnectionWarning} />
        <SearchBar drawerRef={drawer} value={searchQuery} onChange={setSearchQuery} />
        <SearchResultLabel query={searchQuery} />

        {isLoading && !voters && (
          <ActivityIndicator style={styles.loader} size="small" color="#0000ff" />
        )}

        <EmptyState visible={isEmpty && !isLoading} />

        <FlatList
          style={styles.list}
          data={voters}
          keyboardDismissMode='on-drag'
          keyExtractor={(item) => item.serial}
          renderItem={({ item }) => <ListCard {...item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (canLoadNextPage) loadNextPage();
          }}
          ListFooterComponent={
            <Footer
              canLoadNextPage={!!canLoadNextPage}
              isLoading={isLoading}
              isEmpty={isEmpty}
            />
          }
        />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    position: 'relative'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionBanner: {
    backgroundColor: 'red',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 111
  },
  connectionBannerText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'HindSiliguri',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    flex: 1,
    backgroundColor: '#ece3e3',
    fontFamily: 'HindSiliguri',
  },
  filterButton: {
    padding: 12,
    borderRadius: 999,
    backgroundColor: '#ece3e3',
  },
  filterIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  searchResultLabel: {
    marginBottom: 6,
    paddingHorizontal: 16,
    fontFamily: 'HindSiliguri',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'HindSiliguri',
  },
  loader: {
    marginTop: 32,
  },
  footerLoader: {
    marginVertical: 16,
  },
  footerText: {
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'HindSiliguri',
  },
  list: {
    width: '100%',
    paddingHorizontal: 8,
  },
});
