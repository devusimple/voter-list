import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native'
import React from 'react'

const DRAWER_BG = '#f8f9fa';
const CARD_BG = '#fff';

function SectionHeader({ label }: { label: string }) {
    return (
        <Text style={{
            fontSize: 11,
            fontWeight: '700',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 8,
            fontFamily: 'HindSiliguri',
        }}>{label}</Text>
    );
}

function SettingRow({
    icon,
    label,
    value,
    trailing,
    onPress,
}: {
    icon?: any;
    label: string;
    value?: string;
    trailing?: React.ReactNode;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.6 : 1}
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
            }}
        >
            {icon && (
                <Image source={icon} style={{ width: 20, height: 20, tintColor: '#555' }} />
            )}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#1a1a1a', fontWeight: '500', fontFamily: 'HindSiliguri' }}>{label}</Text>
                {value && (
                    <Text style={{ fontSize: 12, color: '#999', marginTop: 1, fontFamily: 'HindSiliguri' }}>{value}</Text>
                )}
            </View>
            {trailing}
        </TouchableOpacity>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
        }}>
            <Text style={{ fontSize: 14, color: '#666', fontFamily: 'HindSiliguri' }}>{label}</Text>
            <Text style={{ fontSize: 14, color: '#1a1a1a', fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 16, fontFamily: 'HindSiliguri' }}>{value}</Text>
        </View>
    );
}

export default function NavigationView() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [language, setLanguage] = React.useState<'বাংলা' | 'English'>('বাংলা');

    const Divider = () => <View style={{ height: 1, backgroundColor: '#eee', marginHorizontal: 20 }} />;

    return (
        <View style={{ flex: 1, backgroundColor: DRAWER_BG }}>
            <View style={{
                backgroundColor: CARD_BG,
                paddingTop: 50,
                paddingBottom: 20,
                paddingHorizontal: 20,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 4 }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        backgroundColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderCurve: 'continuous',
                    }}>
                        <Image source={require('../../assets/icon.png')} style={{ width: 48, height: 48 }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#1a1a1a', fontFamily: 'HindSiliguri' }}>ভোটার তালিকা</Text>
                        <Text style={{ fontSize: 13, color: '#888', marginTop: 1, fontFamily: 'HindSiliguri' }}>ভোটার তথ্য ব্যবস্থাপনা</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: '#000',
                    marginHorizontal: 16,
                    marginTop: 16,
                    borderRadius: 16,
                    borderCurve: 'continuous',
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', fontFamily: 'HindSiliguri' }}>২৪৫</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2, fontFamily: 'HindSiliguri' }}>মোট ভোটার</Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', fontFamily: 'HindSiliguri' }}>১২</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2, fontFamily: 'HindSiliguri' }}>ওয়ার্ড</Text>
                    </View>
                </View>

                <SectionHeader label="সেটিংস" />

                <View style={{
                    backgroundColor: CARD_BG,
                    marginHorizontal: 16,
                    borderRadius: 14,
                    borderCurve: 'continuous',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                    <SettingRow
                        label="ডার্ক মোড"
                        value="অন্ধকার থিম"
                        trailing={
                            <Switch
                                disabled
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#ddd', true: '#555' }}
                                thumbColor={darkMode ? '#000' : '#f4f3f4'}
                            />
                        }
                    />
                    <Divider />
                    <SettingRow
                        label="ভাষা"
                        value={language}
                        onPress={() => setLanguage(l => l === 'বাংলা' ? 'English' : 'বাংলা')}
                        trailing={
                            <View style={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 6,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                            }}>
                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#333', fontFamily: 'HindSiliguri' }}>{language}</Text>
                            </View>
                        }
                    />
                </View>

                <SectionHeader label="অ্যাপ সম্পর্কে" />

                <View style={{
                    backgroundColor: CARD_BG,
                    marginHorizontal: 16,
                    borderRadius: 14,
                    borderCurve: 'continuous',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                    <InfoRow label="সংস্করণ" value="১.০.০" />
                    <Divider />
                    <InfoRow label="তথ্যের উৎস" value="স্থানীয় ডাটাবেস" />
                    <Divider />
                    <InfoRow label="সর্বশেষ হালনাগাদ" value="১৮ মে ২০২৬" />
                    <Divider />
                    <InfoRow label="নির্মাতা" value="Team's devusimple" />
                </View>

                <SectionHeader label="ডেভেলপার তথ্য" />

                <View style={{
                    backgroundColor: CARD_BG,
                    marginHorizontal: 16,
                    borderRadius: 14,
                    borderCurve: 'continuous',
                    padding: 20,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    marginBottom: 24,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                        <View style={{
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            backgroundColor: '#1a1a1a',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: 'HindSiliguri' }}>D</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', fontFamily: 'HindSiliguri' }}>ডেভেলপার টিম</Text>
                            <Text style={{ fontSize: 13, color: '#888', marginTop: 1, fontFamily: 'HindSiliguri' }}>contact@devusimple.com</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        color: '#666',
                        lineHeight: 20,
                        marginTop: 12,
                        fontFamily: 'HindSiliguri',
                    }}>
                        এই অ্যাপটি ভোটার তথ্য সহজে অনুসন্ধান এবং ব্যবস্থাপনার জন্য তৈরি করা হয়েছে। InstantDB ব্যাকএন্ড এবং React Native এক্সপো ফ্রেমওয়ার্ক ব্যবহার করে নির্মিত।
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
