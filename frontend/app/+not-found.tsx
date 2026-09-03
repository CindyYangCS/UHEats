import {View, StyleSheet} from 'react-native';
import{Link, Stack} from 'expo-router';

export default function NotFound() {
    return (
        <>
        <Stack.Screen options={{title: 'Page Not Found'}} />
        <View style={styles.container}>
            <Link href="/" style={styles.button}>
                Go back To Main Page
            </Link>
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(44, 44, 44)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        fontSize: 18,
        textDecorationLine: 'underline',
        color: 'red',
    },
});