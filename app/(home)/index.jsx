import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import sunIcon from '../../assets/sun.png';
import plusIcon from '../..//assets/plusIcon.png';
import sendIcon from '../../assets/sendIcon.png';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

export default function DashboardBody() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); 
  const [user, setUser] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/profile",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          console.log(res.data.data)
          const user = res.data.data
          setUser(user)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 20 }}>
      
      <View style={styles.greetingContainer}>
        <View style={styles.greetingRow}>
          <View style={{flex: 1, rowGap: 20}}>
            <Text style={styles.greetingText}>{user?.fullname && <Text>Good Morning, {user.fullname}</Text>}</Text>
            <Text style={styles.greetingSub}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={sunIcon} style={styles.iconImage} />
        </View>
      </View>

      <View style={styles.accountBox}>
        <Text style={styles.accountLabel}>Account No.</Text>
        <Text style={styles.accountLabel}>{user.wallet?.account_number}</Text>
      </View>

      <View style={styles.balanceSection}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isBalanceVisible ? (
              <Text style={styles.balanceValue}>Rp {user.wallet.balance}</Text>
            ) : (
              <Text style={styles.balanceValue}>Rp ********</Text>
            )}
 
            <TouchableOpacity onPress={toggleBalanceVisibility} style={{ marginLeft: 4 }}>
              {isBalanceVisible ? (
                <Entypo name="eye" size={15} color="black" right={5} marginTop ={5}/>
              ) : (
                <Entypo name="eye-with-line" size={15} color="black" right={5} marginTop ={5}/>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionButtons}>

          <View style={styles.actionButton}>
            <Image source={plusIcon} style={styles.actionButtonIcon} />
          </View>

          <View style={styles.actionButton}>
            <Image source={sendIcon} style={styles.actionButtonIcon} />
          </View>
        </View>
      </View>


      <View style={styles.transactionContainer}>
        <Text style={styles.transactionHeader}>Transaction History</Text>

        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <View style={styles.avatarPlaceholder}></View>
            <View style={styles.transactionTextBlock}>
              console.log({user.data?.fullname})
              <Text style={styles.transactionName}>{user.fullname}</Text>
              <Text style={styles.transactionType}>{user.data?.wallet.amount}</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
          </View>
          <Text style={styles.transactionAmountMinus}>- 75.000,00</Text>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <View style={styles.avatarPlaceholder}></View>
            <View style={styles.transactionTextBlock}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Topup</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
          </View>
          <Text style={styles.transactionAmountPlus}>+ 75.000,00</Text>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <View style={styles.avatarPlaceholder}></View>
            <View style={styles.transactionTextBlock}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
          </View>
          <Text style={styles.transactionAmountMinus}>- 75.000,00</Text>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <View style={styles.avatarPlaceholder}></View>
            <View style={styles.transactionTextBlock}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
          </View>
          <Text style={styles.transactionAmountMinus}>- 75.000,00</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  greetingContainer: {
    marginBottom: 16
  },
  greetingRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  greetingSub: {
    fontSize: 14,
    color: '#555'
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 8
  },
  emojiIcon: {
    fontSize: 20
  },

  accountBox: {
    backgroundColor: '#19918F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  accountLabel: {
    color: '#fff',
    fontSize: 14
  },
  accountNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4
  },

  balanceSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  balanceInfo: {
    flex: 1
  },
  balanceLabel: {
    fontSize: 14,
    color: '#555'
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 8
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 10
  },
  actionButton: {
    backgroundColor: '#19918F',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff'
  },

  transactionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  transactionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12
  },
  transactionTextBlock: {
    flexDirection: 'column'
  },
  transactionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  transactionType: {
    fontSize: 12,
    color: '#555'
  },
  transactionDate: {
    fontSize: 12,
    color: '#999'
  },
  transactionAmountMinus: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold'
  },
  transactionAmountPlus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold'
  }
});
