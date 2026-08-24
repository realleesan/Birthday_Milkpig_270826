import { ItineraryItem, GalleryPhoto } from '@/types';

export interface SeafoodOption {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

export const HERO_DATA = {
  recipientName: 'Milkpig',
  birthDateDisplay: '27.08.2026',
  dateEventDisplay: '27.08.2026',
  ageTitle: 'Happy 21st Birthday & Our Special Date',
  headline: 'Một Ngày Đặc Biệt Dành Cho Em',
  subheading: 'Hành trình ngọt ngào đón tuổi mới cùng những bất ngờ được chuẩn bị riêng cho Milkpig.',
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-wedding-love-116248.mp3',
  audioTitle: 'Romantic Birthday Melody',
};

export const COUNTDOWN_TARGET = '2026-08-27T17:00:00+07:00'; // 5:00 PM on Aug 27, 2026

export const SEAFOOD_OPTIONS: SeafoodOption[] = [
  {
    id: 'opt1',
    name: 'Poseidon Vincom Skylake',
    address: 'Tầng 3, TTTM Vincom Plaza Skylake, Phạm Hùng, Mỹ Đình',
    lat: 21.0185,
    lng: 105.7825,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Poseidon+Vincom+Plaza+Skylake+My+Dinh',
  },
  {
    id: 'opt2',
    name: 'Cửu Vân Long Premium',
    address: 'Tầng 3, TTTM Hanoi Centre, 175 Nguyễn Thái Học, Đống Đa',
    lat: 21.0298,
    lng: 105.8320,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cuu+Van+Long+175+Nguyen+Thai+Hoc',
  },
  {
    id: 'opt3',
    name: 'Sen Tây Hồ Quốc Tế',
    address: '614 Lạc Long Quân, Tây Hồ, Hà Nội',
    lat: 21.0820,
    lng: 105.8190,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sen+Tay+Ho+614+Lac+Long+Quan',
  },
];

export const ITINERARY_DATA: ItineraryItem[] = [
  {
    id: '1',
    time: '17:00',
    title: 'Chặng 1: Đón Công Chúa',
    location: 'Số 42 Ngõ 55 Nguyễn Đạo An, Phú Diễn',
    description: 'Bắt đầu chuyến hành trình tại tổ ấm đón bé heo xinh đẹp với chiếc ôm thật ấm áp.',
    image: '/pics/1787587601373_110981064692002214_480708516939942791_eeb651cb7dd3b0780b1145d0f11db06a.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=42+Ngo+55+Nguyen+Dao+An+Phu+Dien',
    iconName: 'Car',
    tag: 'Khởi đầu',
    lat: 21.0482,
    lng: 105.7605,
    distanceFromPrev: '0 km',
  },
  {
    id: '2',
    time: '18:00',
    title: 'Chặng 2: Photobooth Kỷ Niệm',
    location: 'Red Button Booth - 2 Ngõ 69 Trần Quốc Hoàn',
    description: 'Ghé Red Button Booth chụp bộ ảnh xinh xắn nhí nhảnh lưu giữ tuổi 21 đáng nhớ.',
    image: '/pics/1787587601301_110981064692002214_480708516939942791_32c4ce7092753cdadf2e274d13383792.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Red+Button+Booth+2+Ngo+69+Tran+Quoc+Hoan',
    iconName: 'Camera',
    tag: 'Check-in',
    lat: 21.0392,
    lng: 105.7865,
    distanceFromPrev: '3.2 km',
  },
  {
    id: '3',
    time: '19:30',
    title: 'Chặng 3: Bữa Tối Buffet Hải Sản',
    location: 'Poseidon / Cửu Vân Long / Sen Tây Hồ',
    description: 'Thưởng thức tiệc buffet hải sản tươi ngon mê li tại 1 trong 3 địa điểm tuyệt vời nhất Hà Nội.',
    image: '/pics/1787587374327_110981064692002214_480708516939942791_036dbca6834532da3158d3109d1a6cb0.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Poseidon+Vincom+Plaza+Skylake+My+Dinh',
    iconName: 'Utensils',
    tag: 'Buffet Seafood',
    lat: 21.0298,
    lng: 105.8320,
    distanceFromPrev: '5.2 km',
  },
  {
    id: '4',
    time: '21:30',
    title: 'Chặng 4: Lượn Phố Tiêu Thức Ăn',
    location: 'Cung đường lãng mạn Hồ Tây',
    description: 'Cùng nhau vi vu lượn Hồ Tây dịu mát, ngắm thành phố về đêm và hóng gió tâm sự.',
    image: '/pics/1787587601362_110981064692002214_480708516939942791_404ac55695f75d75041f7f42b5e2ddfa.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ho+Tay+Ha+Noi',
    iconName: 'Coffee',
    tag: 'City Walk',
    lat: 21.0550,
    lng: 105.8280,
    distanceFromPrev: '4.2 km',
  },
  {
    id: '5',
    time: '23:00',
    title: 'Chặng 5: Về Ôm Ấp Ngủ',
    location: 'Tổ ấm (42 Ngõ 55 Nguyễn Đạo An)',
    description: 'Khép lại một ngày sinh nhật trọn vẹn, cùng nhau chìm vào giấc ngủ thật ấm áp và bình yên.',
    image: '/pics/1787587472744_110981064692002214_480708516939942791_b3998ef2290359d6edead2b1fa4fc1d0.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=42+Ngo+55+Nguyen+Dao+An+Phu+Dien',
    iconName: 'Gift',
    tag: 'Sweet Dreams',
    lat: 21.0482,
    lng: 105.7605,
    distanceFromPrev: '7.5 km',
  },
];

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: 'p1',
    title: 'Kỷ niệm 01',
    caption: 'Bó hoa tulip ngọt ngào.',
    date: '2026',
    image: '/pics/1787587601373_110981064692002214_480708516939942791_eeb651cb7dd3b0780b1145d0f11db06a.jpg',
  },
  {
    id: 'p2',
    title: 'Kỷ niệm 02',
    caption: 'Nụ cười tỏa nắng.',
    date: '2026',
    image: '/pics/1787587472682_110981064692002214_480708516939942791_2977f020acc954bc19787b61f741871e.jpg',
  },
  {
    id: 'p3',
    title: 'Kỷ niệm 03',
    caption: 'Bên chiếc nhân vật khổng lồ.',
    date: '2026',
    image: '/pics/1787587601362_110981064692002214_480708516939942791_404ac55695f75d75041f7f42b5e2ddfa.jpg',
  },
  {
    id: 'p4',
    title: 'Kỷ niệm 04',
    caption: 'Nón lá duyên dáng.',
    date: '2026',
    image: '/pics/1787587601330_110981064692002214_480708516939942791_0f00360f83b4d1328e1a68126e654898.jpg',
  },
  {
    id: 'p5',
    title: 'Kỷ niệm 05',
    caption: 'Photobooth studio ngọt ngào.',
    date: '2026',
    image: '/pics/1787587601301_110981064692002214_480708516939942791_32c4ce7092753cdadf2e274d13383792.jpg',
  },
  {
    id: 'p6',
    title: 'Kỷ niệm 06',
    caption: 'Ánh nắng bình yên.',
    date: '2026',
    image: '/pics/1787587472732_110981064692002214_480708516939942791_d9c62a3fe0405295d550917c9be62e64.jpg',
  },
  {
    id: 'p7',
    title: 'Kỷ niệm 07',
    caption: 'Góc nghiêng dịu dàng.',
    date: '2026',
    image: '/pics/1787587472713_110981064692002214_480708516939942791_4587259fa880f57f9fec9d1480b6bf82.jpg',
  },
  {
    id: 'p8',
    title: 'Kỷ niệm 08',
    caption: 'Cuộc gọi Zalo ngộ nghĩnh.',
    date: '2026',
    image: '/pics/1787587472744_110981064692002214_480708516939942791_b3998ef2290359d6edead2b1fa4fc1d0.jpg',
  },
  {
    id: 'p9',
    title: 'Kỷ niệm 09',
    caption: 'Nụ cười dễ thương.',
    date: '2026',
    image: '/pics/1787587601347_110981064692002214_480708516939942791_0680a589ca819eda5e5c311503e673c8.jpg',
  },
];

export const LETTER_DATA = {
  salutation: 'Gửi Milkpig yêu thương,',
  paragraphs: [
    'Chúc mừng sinh nhật vợ yêu tuổi 21! Thời gian trôi qua thật nhanh, từng khoảnh khắc đồng hành với bé heo đều là những ký ức vô giá.',
    'Tuổi mới, chúc bé heo luôn xinh đẹp, đáng yêu và luôn gặt hái được thật nhiều thành công trong công việc và học tập.',
    'Dù cho phía trước có như thế nào, hãy luôn nhớ rằng luôn có một người sẵn sàng lắng nghe, chia sẻ và đồng hành cùng bé heo trên mọi chặng đường.',
    'Hãy sẵn sàng cho cuộc hẹn lãng mạn ngày 27/8 này nhé!',
  ],
  closing: 'Yêu thương & Trân trọng,',
  sender: 'Forever by your side',
};
