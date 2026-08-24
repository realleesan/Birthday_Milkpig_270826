import { ItineraryItem, GalleryPhoto } from '@/types';

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

export const ITINERARY_DATA: ItineraryItem[] = [
  {
    id: '1',
    time: '17:00',
    title: 'Chặng 1: Đón Công Chúa',
    location: 'Điểm hẹn thân quen',
    description: 'Bắt đầu chuyến hành trình với nụ cười rạng rỡ, bó hoa thơm và một chiếc ôm thật ấm áp.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    iconName: 'Car',
    tag: 'Khởi đầu',
  },
  {
    id: '2',
    time: '18:30',
    title: 'Chặng 2: Bữa Tối Lãng Mạn',
    location: 'Nhà hàng Steak & Wine View Sông',
    description: 'Thưởng thức món ăn yêu thích dưới ánh nến lung linh, nâng ly chúc mừng tuổi 21 thật rực rỡ.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    googleMapsUrl: 'https://maps.google.com',
    iconName: 'Utensils',
    tag: 'Dinner',
  },
  {
    id: '3',
    time: '20:30',
    title: 'Chặng 3: Cafe Night View & Thổi Nến',
    location: 'Rooftop Lounge ngắm trọn thành phố',
    description: 'Thổi nến sinh nhật trên chiếc bánh ngọt thơm lừng, ước những điều ước tuyệt vời nhất và ngắm dòng người qua lại.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    googleMapsUrl: 'https://maps.google.com',
    iconName: 'Coffee',
    tag: 'Sweet Moments',
  },
  {
    id: '4',
    time: '22:00',
    title: 'Chặng 4: Bất Ngờ Bí Mật',
    location: 'Location Secret 🤫',
    description: 'Một món quà nhỏ tinh tế cùng lời nhắn được cất giấu cẩn thận trao tận tay Milkpig.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
    iconName: 'Gift',
    tag: 'Special Surprise',
  },
];

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'Nụ cười tỏa nắng',
    caption: 'Khoảnh khắc bình yên bên nhau trong một chiều thu dịu mát.',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'portrait',
    rotationAngle: -2,
  },
  {
    id: 'g2',
    title: 'Chuyến đi ngọt ngào',
    caption: 'Cùng nhau đi qua những cung đường ngập tràn kỷ niệm.',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'landscape',
    rotationAngle: 3,
  },
  {
    id: 'g3',
    title: 'Ánh nến sinh nhật',
    caption: 'Mỗi năm trôi qua, nụ cười của Milkpig vẫn luôn là điều tuyệt vời nhất.',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'square',
    rotationAngle: -3,
  },
  {
    id: 'g4',
    title: 'Nắm tay qua giông bão',
    caption: 'Cảm ơn em đã luôn là hậu phương ngọt ngào và ấm áp.',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'portrait',
    rotationAngle: 2,
  },
];

export const LETTER_DATA = {
  salutation: 'Gửi Milkpig yêu thương,',
  paragraphs: [
    'Chúc mừng sinh nhật vợ yêu tuổi 21! Thời gian trôi qua thật nhanh, từng khoảnh khắc đồng hành với bé heo đều là những ký ức vô giá.',
    'Tuổi mới, chúc bé heo luôn xinh đẹp, đáng yêu và luôn gặt hái được thật nhiều thành công trong công việc và học tập.',
    'Dù cho phía trước có như thế nào, hãy luôn nhớ rằng luôn có một người sẵn sàng lắng nghe, chia sẻ và đồng hành cùng bé heo trên mọi chặng đường.',
    'Hãy sẵn sàng cho cuộc hẹn lãng mạn ngày 27/8 này nhé! 💖',
  ],
  closing: 'Yêu thương & Trân trọng,',
  sender: 'Forever by your side ✨',
};
