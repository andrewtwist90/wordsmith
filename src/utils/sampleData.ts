import { LyricsPoem } from '../types';

export const sampleData: LyricsPoem[] = [
  {
    id: '1',
    title: 'Morning Glory',
    content: `Golden rays break through the misty dawn
A new day whispers soft and clear
The world awakens with a gentle yawn
As morning glory draws us near

Birds sing melodies upon the breeze
Their chorus lifts the sleepy earth
While dewdrops dance on emerald trees
Celebrating nature's rebirth

This moment holds such simple grace
A reminder of life's sweet song
In morning's warm and bright embrace
We find where we truly belong`,
    type: 'poem',
    artist: 'Anonymous',
    collection: 'Nature Verses',
    year: 2024,
    tags: ['nature', 'morning', 'peaceful', 'original'],
    annotations: [
      {
        id: 'ann1',
        textStart: 0,
        textEnd: 44,
        selectedText: 'Golden rays break through the misty dawn',
        note: 'Beautiful imagery of sunrise breaking through morning mist',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 'ann2',
        textStart: 200,
        textEnd: 240,
        selectedText: 'Birds sing melodies upon the breeze',
        note: 'Personification of nature - birds as musicians',
        createdAt: new Date('2024-01-15'),
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Digital Dreams',
    content: `Code flows like rivers through the night
Pixels dance in perfect harmony
Logic builds castles made of light
In this realm of digital artistry

Functions calling out across the void
Variables holding secrets deep
While algorithms, so carefully deployed
Promise dreams that data keeps

In binary we trust and find
The poetry of ones and zeros
Creating worlds within the mind
Where every coder becomes heroes`,
    type: 'poem',
    artist: 'TechPoet',
    collection: 'Silicon Verses',
    year: 2023,
    tags: ['technology', 'programming', 'modern', 'digital'],
    annotations: [
      {
        id: 'ann3',
        textStart: 39,
        textEnd: 74,
        selectedText: 'Pixels dance in perfect harmony',
        note: 'Love this metaphor for how pixels create beautiful displays',
        createdAt: new Date('2024-01-20'),
      }
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'City Lights',
    content: `Neon signs paint the midnight sky
Stories told in electric hue
A million dreams that never die
In the city that never knew

Footsteps echo on empty streets
While windows glow like distant stars
Each light a life, each shadow meets
The rhythm of passing cars

In this urban symphony
We find our place among the crowd
Dancing to the city's melody
Living free and singing loud`,
    type: 'lyrics',
    artist: 'Urban Echo',
    album: 'Midnight Sessions',
    year: 2022,
    tags: ['urban', 'nightlife', 'city', 'contemporary'],
    annotations: [],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  }
];