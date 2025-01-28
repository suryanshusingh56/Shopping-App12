const axios = require('axios');
const fs = require('fs');
const path = require('path');

const UNSPLASH_API_KEY = 'JjqhBqaYla0NmfnlM-9A1mK2StWz2R7qGPBEosCTv58'; // Replace with your Unsplash API Key

// Array of product objects
const products = [
    {
    
        name: 'boAt Airdopes 121v2 TWS Earbuds',
        image: '/images/boatHeadfone.jpg',
        description:
          'boAt Airdopes 121v2 TWS Earbuds with Bluetooth V5.0, Immersive Audio, Up to 14H Total Playback, Instant Voice Assistant, Easy Access Controls with Mic and Dual Tone Ergonomic Design(Active Black) ',
        brand: 'Boat',
        category: 'Electronics',
        price: 20.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'Micromax IN 1b (Purple, 32 GB)',
        image: '/images/micromaxInB.jpg',
        description:
          'Say hello to the Micromax IN 1b smartphone whose powerful MediaTek Helio G35 gaming processor and a 5000 mAh battery will pave the way for effortless multitasking and usage.',
        brand: 'Micromax',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'Cannon EOS 80D DSLR Camera',
        image: '/images/camera.jpg',
        description:
          'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
      },
      {
        name: 'Sony Playstation 4 Pro White Version',
        image: '/images/playstation.jpg',
        description:
          'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        brand: 'Sony',
        category: 'Electronics',
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
      },
      {
        name: 'Logitech G-Series Gaming Mouse',
        image: '/images/mouse.jpg',
        description:
          'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
        brand: 'Logitech',
        category: 'Electronics',
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
      },
      {
        name: 'Amazon Echo Dot 3rd Generation',
        image: '/images/alexa.jpg',
        description:
          'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
        brand: 'Amazon',
        category: 'Electronics',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12,
      },
        {
          name: 'Amazon Echo Dot 3rd Generation',
          image: '/images/alexa.jpg',
          description:
            'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces.',
          brand: 'Amazon',
          category: 'Electronics',
          price: 29.99,
          countInStock: 0,
          rating: 4,
          numReviews: 12,
        },
        {
          name: 'Apple MacBook Air M2',
          image: '/images/macbook.jpg',
          description:
            'Apple-designed M2 chip for a giant leap in CPU, GPU, and machine learning performance. Superfast SSD storage.',
          brand: 'Apple',
          category: 'Laptops',
          price: 999.99,
          countInStock: 5,
          rating: 4.9,
          numReviews: 28,
        },
        {
          name: 'Samsung Galaxy S22 Ultra',
          image: '/images/samsungS22.jpg',
          description:
            'Samsung Galaxy S22 Ultra with S Pen, long-lasting battery, and a cutting-edge camera system.',
          brand: 'Samsung',
          category: 'Mobile Phones',
          price: 1199.99,
          countInStock: 10,
          rating: 4.8,
          numReviews: 34,
        },
        {
          name: 'Sony WH-1000XM5 Wireless Headphones',
          image: '/images/sonyheadphones.jpg',
          description:
            'Industry-leading noise cancellation with Dual Noise Sensor technology. Comfortable design for all-day wear.',
          brand: 'Sony',
          category: 'Electronics',
          price: 399.99,
          countInStock: 8,
          rating: 4.7,
          numReviews: 18,
        },
        {
          name: 'Dell XPS 13 Laptop',
          image: '/images/dellxps.jpg',
          description:
            'Dell XPS 13 features a 13.4-inch InfinityEdge display, 11th Gen Intel Core processors, and a sleek design.',
          brand: 'Dell',
          category: 'Laptops',
          price: 1099.99,
          countInStock: 7,
          rating: 4.6,
          numReviews: 15,
        },
        {
          name: 'Nike Air Zoom Pegasus 39',
          image: '/images/nikepegasus.jpg',
          description:
            'Nike running shoes built for comfort and durability with advanced cushioning technology.',
          brand: 'Nike',
          category: 'Footwear',
          price: 129.99,
          countInStock: 15,
          rating: 4.5,
          numReviews: 22,
        },
        {
          name: 'Bose SoundLink Revolve+ II',
          image: '/images/bose.jpg',
          description:
            'Deep, loud, and immersive sound, with True 360-degree coverage. Water-resistant design for outdoor use.',
          brand: 'Bose',
          category: 'Electronics',
          price: 329.99,
          countInStock: 9,
          rating: 4.7,
          numReviews: 30,
        },
        {
          name: 'Fitbit Charge 5',
          image: '/images/fitbit.jpg',
          description:
            'Advanced fitness and health tracker with built-in GPS, stress management, and sleep tracking.',
          brand: 'Fitbit',
          category: 'Wearables',
          price: 149.99,
          countInStock: 20,
          rating: 4.3,
          numReviews: 19,
        },
        {
          name: 'Canon EOS R5 Camera',
          image: '/images/canon.jpg',
          description:
            'High-performance mirrorless camera with 45MP resolution, 8K video, and advanced autofocus system.',
          brand: 'Canon',
          category: 'Cameras',
          price: 3899.99,
          countInStock: 3,
          rating: 4.9,
          numReviews: 12,
        },
        {
          name: 'Logitech MX Master 3 Mouse',
          image: '/images/logitechmouse.jpg',
          description:
            'Advanced wireless mouse with ergonomic design, hyper-fast scrolling, and customizable buttons.',
          brand: 'Logitech',
          category: 'Accessories',
          price: 99.99,
          countInStock: 12,
          rating: 4.8,
          numReviews: 25,
        },
        {
          name: 'Razer BlackWidow V3 Mechanical Keyboard',
          image: '/images/razerkeyboard.jpg',
          description:
            'Mechanical gaming keyboard with Razer Green switches, RGB lighting, and durable build.',
          brand: 'Razer',
          category: 'Gaming',
          price: 129.99,
          countInStock: 10,
          rating: 4.6,
          numReviews: 20,
        },
        {
          name: 'Adidas Ultraboost 22',
          image: '/images/adidasultraboost.jpg',
          description:
            'Premium running shoes with responsive cushioning and breathable knit upper.',
          brand: 'Adidas',
          category: 'Footwear',
          price: 179.99,
          countInStock: 18,
          rating: 4.5,
          numReviews: 16,
        },
        {
          name: 'Amazon Kindle Paperwhite',
          image: '/images/kindle.jpg',
          description:
            'Waterproof e-reader with a 6.8-inch display, adjustable warm light, and weeks of battery life.',
          brand: 'Amazon',
          category: 'Electronics',
          price: 139.99,
          countInStock: 25,
          rating: 4.8,
          numReviews: 40,
        },
        {
          name: 'GoPro HERO10 Black',
          image: '/images/gopro.jpg',
          description:
            'Rugged and waterproof action camera with 5.3K video, HyperSmooth 4.0 stabilization, and a front-facing screen.',
          brand: 'GoPro',
          category: 'Cameras',
          price: 499.99,
          countInStock: 10,
          rating: 4.7,
          numReviews: 22,
        },
        {
          name: 'Samsung 55-inch QLED 4K Smart TV',
          image: '/images/samsungtv.jpg',
          description:
            'Experience vibrant colors and stunning detail with Samsung QLED 4K UHD Smart TV.',
          brand: 'Samsung',
          category: 'Electronics',
          price: 699.99,
          countInStock: 6,
          rating: 4.9,
          numReviews: 18,
        },
        {
          name: 'Anker PowerCore 26800mAh Power Bank',
          image: '/images/ankerpowerbank.jpg',
          description:
            'High-capacity portable charger with dual input ports, 3 USB ports, and fast charging technology.',
          brand: 'Anker',
          category: 'Accessories',
          price: 59.99,
          countInStock: 14,
          rating: 4.8,
          numReviews: 27,
        },
        {
          name: 'Dyson V15 Detect Vacuum Cleaner',
          image: '/images/dysonvacuum.jpg',
          description:
            'Advanced cordless vacuum cleaner with laser dust detection and powerful suction.',
          brand: 'Dyson',
          category: 'Home Appliances',
          price: 699.99,
          countInStock: 8,
          rating: 4.9,
          numReviews: 30,
        },
        {
          name: 'Sony PlayStation 5',
          image: '/images/ps5.jpg',
          description:
            'The next generation of gaming with stunning graphics, lightning-fast loading, and immersive 3D audio.',
          brand: 'Sony',
          category: 'Gaming',
          price: 499.99,
          countInStock: 4,
          rating: 5.0,
          numReviews: 50,
        },
        {
          name: 'Apple AirPods Pro 2nd Generation',
          image: '/images/airpods.jpg',
          description:
            'Wireless earbuds with active noise cancellation, adaptive transparency, and personalized spatial audio.',
          brand: 'Apple',
          category: 'Audio',
          price: 249.99,
          countInStock: 20,
          rating: 4.7,
          numReviews: 35,
        },
        {
          name: 'JBL Charge 5 Bluetooth Speaker',
          image: '/images/jblcharge.jpg',
          description:
            'Portable waterproof speaker with up to 20 hours of playtime and powerful sound quality.',
          brand: 'JBL',
          category: 'Audio',
          price: 179.99,
          countInStock: 10,
          rating: 4.6,
          numReviews: 18,
        },
];

const fetchImagesFromUnsplash = async (query) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos', {
      params: {
        query,
        per_page: 1, // Fetch only one image per product
        client_id: UNSPLASH_API_KEY,
      },
    });
    return response.data.length > 0 ? response.data[0].urls.full : null;
  } catch (error) {
    console.error(`Error fetching data for query "${query}":`, error.message);
    return null;
  }
};

const downloadImage = async (url, filename) => {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    if (response.status === 200) {
      const writer = fs.createWriteStream(path.resolve(__dirname, 'images', filename));
      response.data.pipe(writer);

      writer.on('finish', () => {
        console.log(`Successfully downloaded: ${filename}`);
      });

      writer.on('error', (error) => {
        console.error(`Error writing the file ${filename}:`, error);
      });
    } else {
      console.log(`Error downloading ${filename}: Status code ${response.status}`);
    }
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error.message);
  }
};

const downloadProductImages = async () => {
  if (!fs.existsSync(path.resolve(__dirname, 'images'))) {
    fs.mkdirSync(path.resolve(__dirname, 'images'));
  }

  for (const product of products) {
    const imageUrl = await fetchImagesFromUnsplash(product.name);
    if (imageUrl) {
      const filename = `${product.name.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      await downloadImage(imageUrl, filename);
    } else {
      console.log(`No image found for product: ${product.name}`);
    }
  }
};

downloadProductImages();
