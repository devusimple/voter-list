import React from 'react'
import {
  ElevatedCard,
  Column,
  Row,
  Text,
  HorizontalDivider,
  Box,
} from '@expo/ui/jetpack-compose'
import {
  fillMaxWidth,
  paddingAll,
  padding,
  width,
  weight,
  background,
  clip,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'

export interface ListCardProps {
  item: {
    id: string
    serial: string
    name: string
    voterIdNumber: number
    fatherName: string
    motherName: string
    profession: string
    dateOfBirth: string
    address: string
  }
}

export default function ListCard({ item }: ListCardProps) {
  return (
    <ElevatedCard modifiers={[fillMaxWidth()]}>
      <Column modifiers={[paddingAll(16)]}>
        <Row
          horizontalArrangement="spaceBetween"
          verticalAlignment="center"
          modifiers={[fillMaxWidth()]}
        >
          <Text style={{ typography: 'labelSmall' }} color="#666">
            #{item.serial}
          </Text>
          <Box
            modifiers={[
              background('#1a73e8'),
              clip(Shapes.RoundedCorner(10)),
              padding(10, 3, 10, 3),
            ]}
          >
            <Text style={{ typography: 'labelSmall' }} color="#fff">
              ভোটার
            </Text>
          </Box>
        </Row>
        <Text style={{ typography: 'titleMedium' }} modifiers={[padding(0, 8, 0, 8)]}>
          {item.name}
        </Text>
        <HorizontalDivider thickness={1} color="#E5E5E5" />
        <Column verticalArrangement={{ spacedBy: 8 }} modifiers={[padding(0, 8, 0, 0)]}>
          <InfoRow label="পিতা" value={item.fatherName} />
          <InfoRow label="মাতা" value={item.motherName} />
          <InfoRow label="ভোটার আইডি" value={String(item.voterIdNumber)} />
          <InfoRow label="পেশা" value={item.profession} />
          <InfoRow label="জন্ম তারিখ" value={item.dateOfBirth} />
          <InfoRow label="ঠিকানা" value={item.address} />
        </Column>
      </Column>
    </ElevatedCard>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Row verticalAlignment="center" modifiers={[fillMaxWidth()]}>
      <Text
        style={{ typography: 'bodySmall' }}
        color="#888"
        modifiers={[width(90)]}
      >
        {label}
      </Text>
      <Text
        style={{ typography: 'bodyMedium' }}
        color="#222"
        modifiers={[weight(1)]}
      >
        {value}
      </Text>
    </Row>
  )
}
