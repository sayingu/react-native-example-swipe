import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

let DATA = [
    { key: 0, title: 'abc', link: 'https://source.unsplash.com/featured/?jean back pocket' },
    { key: 1, title: 'def', link: 'https://source.unsplash.com/featured/?skinny jeans' },
    { key: 2, title: 'grgegrge', link: 'https://source.unsplash.com/featured/?skinny jeans ass' },
    { key: 3, title: 'fewgrherht', link: 'https://source.unsplash.com/featured/?woman leg' },
    { key: 4, title: 'ab14322r23c', link: 'https://source.unsplash.com/featured/?wonder woman' },
    { key: 5, title: 'ergergreg34', link: 'https://source.unsplash.com/featured/?woman navel' },
    { key: 6, title: 'rgege321424', link: 'https://source.unsplash.com/featured/?woman blue bikini' },
    { key: 7, title: 'qweqe5456', link: 'https://source.unsplash.com/featured/?bikini' },
];
let start = 1;
let url = `https://www.googleapis.com/customsearch/v1` +
    `?key=${Expo.Constants.manifest.extra.key}&cx=${Expo.Constants.manifest.extra.cx}` +
    `&q=${Expo.Constants.manifest.extra.q}&filter=1&searchType=image&imgType=photo&imgSize=large&start=${start}`;

export default class App extends React.Component {
    componentWillMount() {
        /*
        for (var i = 0; i < 10; i++) {
            this.getGoogleCustomSearchData();
        }
        */
    }

    getGoogleCustomSearchData() {
        fetch(url).then(response => { return response.json(); })
            .then(json => {
                console.log(`start=${start}`);
                console.log(json);
                if (!json.error) {
                    DATA = DATA.concat(json.items.filter(item => item.link).map((value, index) => { return { key: index + start - 1, ...value } }));
                }

                if (start == 1) {
                    this.forceUpdate();
                }

                start += 10;
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
        if (DATA.length < 1) return null;

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
