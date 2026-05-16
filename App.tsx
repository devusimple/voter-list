import { useState, useCallback, useMemo } from 'react'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Host,
  Column,
  Row,
  Text,
  OutlinedTextField,
  LazyColumn,
  Box,
  CircularProgressIndicator,
} from '@expo/ui/jetpack-compose'
import {
  fillMaxSize,
  fillMaxWidth,
  paddingAll,
  padding,
  weight,
  clickable,
  background,
  clip,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'
import { PullToRefreshBox } from '@expo/ui/jetpack-compose'
import db from './utils/db'
import ListCard from './components/list-card'

export default function App() {
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [searchVersion, setSearchVersion] = useState(0)

  const { data, error, isLoading } = db.useQuery({
    voterLists: {
      $: {
        order: { serverCreatedAt: 'asc', serial: 'asc' },
      },
    },
  })

  const items = data?.voterLists ?? []

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const q = search.trim().toLowerCase()
    return items.filter((item) => {
      const name = (item.name || '').toLowerCase()
      const father = (item.fatherName || '').toLowerCase()
      const mother = (item.motherName || '').toLowerCase()
      const profession = (item.profession || '').toLowerCase()
      const address = (item.address || '').toLowerCase()
      const serial = (item.serial || '').toLowerCase()
      const voterId = String(item.voterIdNumber || '')
      return (
        name.includes(q) ||
        father.includes(q) ||
        mother.includes(q) ||
        profession.includes(q) ||
        address.includes(q) ||
        serial.includes(q) ||
        voterId.includes(q)
      )
    })
  }, [items, search])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await db.queryOnce({
        voterLists: {
          $: {
            order: { serverCreatedAt: 'asc' },
          },
        },
      })
    } finally {
      setRefreshing(false)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSearch('')
    setSearchVersion((v) => v + 1)
  }, [])

  const displayData = search.trim() ? filteredItems : items

  if (isLoading) {
    return (
      <Host style={{ flex: 1 }}>
        <Box contentAlignment="center" modifiers={[fillMaxSize()]}>
          <CircularProgressIndicator />
        </Box>
      </Host>
    )
  }

  if (error) {
    return (
      <Host style={{ flex: 1 }}>
        <Box contentAlignment="center" modifiers={[fillMaxSize()]}>
          <Text color="#B3261E">ত্রুটি: {error.message}</Text>
        </Box>
      </Host>
    )
  }

  return (
    <Host style={{ flex: 1 }}>
      <StatusBar hidden />
      <Column modifiers={[fillMaxSize(), padding(16, 40, 16, 8)]}>
        <OutlinedTextField
          key={`search-${searchVersion}`}
          defaultValue=""
          onValueChange={setSearch}
          singleLine
          modifiers={[fillMaxWidth()]}
        >
          <OutlinedTextField.Placeholder>
            <Text>নাম, ভোটার আইডি বা সিরিয়াল দিয়ে সার্চ করুন...</Text>
          </OutlinedTextField.Placeholder>
          {search.length > 0 && (
            <OutlinedTextField.TrailingIcon>
              <Text modifiers={[clickable(handleClear)]}>✕</Text>
            </OutlinedTextField.TrailingIcon>
          )}
        </OutlinedTextField>
        {search.trim() ? (
          <Text
            style={{ typography: 'labelMedium' }}
            color="#888"
            modifiers={[padding(0, 4, 0, 0)]}
          >
            {filteredItems.length} টি ফলাফল
          </Text>
        ) : null}
        <PullToRefreshBox
          isRefreshing={refreshing}
          onRefresh={onRefresh}
          modifiers={[fillMaxWidth(), weight(1)]}
        >
          <LazyColumn
            verticalArrangement={{ spacedBy: 8 }}
            contentPadding={{ top: 8, bottom: 16 }}
            modifiers={[fillMaxSize()]}
          >
            {displayData.map((item) => (
              <ListCard key={item.id} item={item} />
            ))}
          </LazyColumn>
        </PullToRefreshBox>
      </Column>
    </Host>
  )
}
