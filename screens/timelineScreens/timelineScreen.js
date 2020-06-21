import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, Alert } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, sortBy, papulateOptions,  } from '../../global/globalConstants';

import ComboBox from '../../components/customComboBoxComponent'
import ChoreComponent from '../../components/choreComponent'

export default function TimeLineScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [chores, setChores] = useState([]);

  const [sortState, setSortState] = useState(sortBy.MostRecent);


  // Get call to get the user info from the api,
  const getMyChores = async (state) => {
    var data = await authGet(ApiRoutes.getMyChores);
    if (data.success) {
      if (state == sortBy.MostRecent) {
        
        setChores(await data.response
          .filter(chore => !chore.done)
          .sort(function(a, b) {
            a = new Date(a.createdOn);
            b = new Date(b.createdOn);
            return a > b ? -1 : a < b ? 1 : 0;
          }));
      }
      else if (state == sortBy.Urgency) {
        setChores(await data.response
          .filter(chore => !chore.done)
          .sort(function(a, b) {
            a = a.urgency;
            b = b.urgency;
            return a > b ? -1 : a < b ? 1 : 0;
          }));
      }
      else {
        setChores(await data.response);
      }

    }
  }

  const hundleSortSelection = (value) => {
    setSortState(value);
    getMyChores(value);

  }



  // Automatic reload when the screen is reentered
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getMyChores();

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  if (loaded)
    return (
      <View style={styles.container}>

        <ComboBox
          buttonStyle={globalStyles.filterSelection}
          selected={sortState}
          onSelect={hundleSortSelection}
          options={papulateOptions(sortBy)} />
        <FlatList
          data={chores}
          keyExtractor={item => `${item.choreId}`}
          renderItem={({ item }) => {
            return (
              <ChoreComponent chore={item} room={{ roomId: item.roomId, roomName: item.roomName }} onUpdate={getMyChores} />
            );
          }
          }
        />

      </View>
    )
  else
    return (
      <AppLoading startAsync={getMyChores} onFinish={() => setLoaded(true)} />
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginTop: -70,
    marginBottom: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-around"
  },
  modelButtonContainer: {
    alignSelf: "stretch",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    minWidth: '90%',
    margin: 20,
    backgroundColor: colors.primaryBackgroundColor,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: colors.primaryFontColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    ...globalStyles.text,
    marginBottom: 20
  },

});
