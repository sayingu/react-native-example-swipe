import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

let DATA = [];
let dataLoaded = false;

export default class App extends React.Component {
    componentWillMount() {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${Expo.Constants.manifest.extra.key}&cx=${Expo.Constants.manifest.extra.cx}&q=${Expo.Constants.manifest.extra.q}&filter=1&searchType=image&imgType=photo&imgSize=large`)
            .then(response => { return response.json(); })
            .then(json => {
                DATA = json.items.filter(item => item.link).map((value, index) => { return { key: index, ...value } });
                dataLoaded = true;
                this.forceUpdate();
            });
    }

    renderCard(item) {
        return (
            <Card
                key={item.key}
                title={item.title}
                titleStyle={{ height: 40 }}
                image={{ uri: item.link }}
                imageStyle={{ height: 400 }}
            >
                <Text style={{ marginBottom: 10 }}>
                    I can customize the card further.
                </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03a9f4"
                    title="View Now!"
                />
            </Card>
        );
    }

    render() {
        if (!dataLoaded) return null;

        return (
            <View style={styles.container}>
                <Deck
                    data={DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
        );
    }

    renderNoMoreCards() {
        return (
            <Card title="All Done!">
                <Text style={{ marginBottom: 10 }}>
                    There's no more content here!
                </Text>
                <Button
                    backgroundColor="#03a9f4"
                    title="Get more!"
                />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
