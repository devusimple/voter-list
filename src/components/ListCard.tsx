import { Text, View } from 'react-native';
import type { Voter } from '../types';

export function ListCard(voter: Voter) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.serialBadge}>
          <Text style={styles.serialBadgeText}>{voter.serial}</Text>
        </View>
        <Text style={styles.voterId}>ID: {voter.voterIdNumber}</Text>
      </View>

      <Text style={styles.name} selectable>{voter.name}</Text>

      <View style={styles.detailsGrid}>
        <DetailRow label="পিতার নাম" value={voter.fatherName} />
        <DetailRow label="মাতার নাম" value={voter.motherName} />
        <DetailRow label="পেশা" value={voter.profession} />
        <DetailRow label="জন্ম তারিখ" value={voter.dateOfBirth} />
      </View>

      {voter.address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>ঠিকানা</Text>
          <Text style={styles.addressValue} selectable>{voter.address}</Text>
        </View>
      )}
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} selectable>{value}</Text>
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderCurve: 'continuous' as const,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 6,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  serialBadge: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  serialBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700' as const,
    fontFamily: 'HindSiliguri',
  },
  voterId: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600' as const,
    fontFamily: 'HindSiliguri',
  },
  name: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1a1a1a',
    marginBottom: 12,
    fontFamily: 'HindSiliguri',
  },
  detailsGrid: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontFamily: 'HindSiliguri',
  },
  detailValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500' as const,
    flex: 1,
    textAlign: 'right' as const,
    fontFamily: 'HindSiliguri',
  },
  addressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 4,
  },
  addressLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    fontFamily: 'HindSiliguri',
  },
  addressValue: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
    fontFamily: 'HindSiliguri',
  },
};
