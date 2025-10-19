import { checkLogin } from '@/utils/Common';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Admin({ navigation }: { navigation: any }) {
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        const getFullName = async () => {
            const name = await checkLogin(navigation);
            if (name) {
                setFullName(name);
            }
        };
        getFullName();
    }, [navigation])
    return (
        <SafeAreaView>
            <Text>Xin chào : {fullName}</Text>
        </SafeAreaView>
    )
}
