import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Post from '../component/Post';

export default function Postlist({navigation, props}) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({item}) => <Post navigation={navigation} post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});

const posts = [
  {
    id: '1',
    name: 'Zeynep Alagöz',
    text: 'Öğrenci taleplerinin Boğaziçi Üniversitesi yönetimine hızlı ve doğru şekilde iletilmesini sağlamak amacıyla kurulan Öğrenci Temsilciliği Kurulu (ÖTK) için seçim takvimi açıklandı. 5 Kasım’da başlayacak adaylık başvuruları 12 Kasım’da sona ererken, 26 Kasım-3 Aralık tarihleri arasında seçim yapılacak.',
    timestamp: 1569109273726,
    avatar:
      'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
    image: 'https://haberler.boun.edu.tr/sites/haberler.boun.edu.tr/files/styles/haber_front_2_coloumn_-_crop/public/kapak-ve-haber-resimleri/egv5ddlwsaaahk4.jpg?itok=do9z1kur&c=a930decf5bb73ea2ea7598d99188886b',
  },
  {
    id: '2',
    name: 'Kıymet Akdemir',
    text: "NeurotechEU Konsorsiyumu yöneticileri 12 Ekim’de ilk kez yüz yüze yapılan konferansla Almanya Bonn’da bir araya geldi. Buluşmaya NeurotechEU ortağı olan Avrupa'nın önde gelen üniversitelerinden temsilciler katılırken, konsorsiyuma üye yükseköğretim kurumları arasında uzun dönem iş birliklerinin nasıl daha üst seviyelere taşınabileceği ele alındı. Boğaziçi Üniversitesi’ni Biyomedikal Mühendisliği Enstitüsü Müdürü Prof. Dr. Can Yücesoy ile Endüstri Mühendisliği Öğretim Üyesi Prof. Dr. Necati Aras temsil etti.  ",
    timestamp: 1569109273726,
    avatar: 'https://www.suaytour.com/Content/images/default-profile.png',
    image: 'https://haberler.boun.edu.tr/sites/haberler.boun.edu.tr/files/styles/haber_front_2_coloumn_-_crop/public/kapak-ve-haber-resimleri/dez_internationales_bfro_055_a_gruppe_mit_team.jpeg?itok=rQ-OMLJ4&c=58386f35d4d807f668d19443f4bc1c6b',
  },
  {
    id: '3',
    name: 'Halil Baydar',
    text: "Londra merkezli yükseköğretim derecelendirme kuruluşu Times Higher Education'ın (THE) hazırladığı, Alanlara Göre En İyi Üniversiteler Sıralaması 2022’de hukuk, sosyal bilimler, işletme ve ekonomi ile eğitim listelerinin ardından, sanat ve beşeri bilimler sıralaması da açıklandı. Buna göre Boğaziçi Üniversitesi bu alanda Türkiye’de ilk, dünyada ise ilk 300’de yer aldı. Boğaziçi Üniversitesi tarih, dil, edebiyat ve felsefe alanlarında da birinci sırada yer alıyor.",
    timestamp: 1569109273726,
    avatar:
      'https://media-exp1.licdn.com/dms/image/C4E03AQFUByr623ke5g/profile-displayphoto-shrink_400_400/0/1590683064023?e=1641427200&v=beta&t=oy8EWEnUHy58jbgxTz9_FqsGFyV-g6T2DqeY0Fyy7a0',
    image: 'https://haberler.boun.edu.tr/sites/haberler.boun.edu.tr/files/styles/haber_front_2_coloumn_-_crop/public/kapak-ve-haber-resimleri/why-is-it-so-important-to-study-humanities-blog-image-780_0.jpg?itok=PnXoU_1M&c=822d5f6a127bc7de1c604d3c2b20afd4',
  },
];
