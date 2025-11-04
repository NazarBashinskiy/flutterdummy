import 'package:flutter/material.dart';
import '../widgets/app_header.dart';
import '../widgets/app_footer.dart';
import '../widgets/product_card.dart';
import '../models/product.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentBanner = 0;
  final List<String> _bannerTitles = [
    'Скидки до 50% на уход за кожей',
    'Новая коллекция декоративной косметики',
    'Подарочные наборы со скидкой',
  ];

  final List<Product> _featuredProducts = [
    Product(
      id: '1',
      name: 'Увлажняющий крем для лица с гиалуроновой кислотой',
      brand: 'L\'Oreal Paris',
      price: 599,
      oldPrice: 899,
      imageUrl: '',
      category: 'Уход за лицом',
      rating: 4.7,
      reviewCount: 234,
      hasDiscount: true,
    ),
    Product(
      id: '2',
      name: 'Тушь для ресниц объемная',
      brand: 'Maybelline',
      price: 449,
      oldPrice: 599,
      imageUrl: '',
      category: 'Макияж',
      rating: 4.5,
      reviewCount: 189,
      hasDiscount: true,
    ),
    Product(
      id: '3',
      name: 'Губная помада матовая',
      brand: 'Vivienne Sabo',
      price: 299,
      imageUrl: '',
      category: 'Макияж',
      rating: 4.3,
      reviewCount: 145,
      isNew: true,
    ),
    Product(
      id: '4',
      name: 'Шампунь восстанавливающий для поврежденных волос',
      brand: 'Garnier',
      price: 349,
      oldPrice: 499,
      imageUrl: '',
      category: 'Уход за волосами',
      rating: 4.6,
      reviewCount: 312,
      hasDiscount: true,
    ),
    Product(
      id: '5',
      name: 'Сыворотка для лица с витамином C',
      brand: 'Garnier',
      price: 799,
      imageUrl: '',
      category: 'Уход за лицом',
      rating: 4.8,
      reviewCount: 421,
      isNew: true,
    ),
    Product(
      id: '6',
      name: 'Палетка теней для век',
      brand: 'Luxvisage',
      price: 549,
      oldPrice: 799,
      imageUrl: '',
      category: 'Макияж',
      rating: 4.4,
      reviewCount: 167,
      hasDiscount: true,
    ),
    Product(
      id: '7',
      name: 'Крем для рук питательный',
      brand: 'Neutrogena',
      price: 259,
      imageUrl: '',
      category: 'Уход за телом',
      rating: 4.5,
      reviewCount: 98,
    ),
    Product(
      id: '8',
      name: 'Мицеллярная вода для снятия макияжа',
      brand: 'L\'Oreal Paris',
      price: 399,
      oldPrice: 549,
      imageUrl: '',
      category: 'Уход за лицом',
      rating: 4.7,
      reviewCount: 278,
      hasDiscount: true,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Banner carousel
            _buildBannerCarousel(),
            const SizedBox(height: 48),
            // Categories
            _buildCategories(),
            const SizedBox(height: 48),
            // Featured products
            _buildFeaturedProducts(),
            const SizedBox(height: 48),
            // Benefits section
            _buildBenefits(),
            const SizedBox(height: 48),
            // Footer
            const AppFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildBannerCarousel() {
    return Container(
      height: 400,
      color: Colors.grey[100],
      child: Stack(
        children: [
          PageView.builder(
            itemCount: _bannerTitles.length,
            onPageChanged: (index) => setState(() => _currentBanner = index),
            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      const Color(0xFFE31E24).withOpacity(0.8),
                      const Color(0xFFFF6B6B).withOpacity(0.8),
                    ],
                  ),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        _bannerTitles[index],
                        style: const TextStyle(
                          fontSize: 42,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 24),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/catalog');
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: const Color(0xFFE31E24),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 48,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text(
                          'Смотреть товары',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          // Indicators
          Positioned(
            bottom: 24,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                _bannerTitles.length,
                (index) => Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: _currentBanner == index ? 32 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: _currentBanner == index
                        ? Colors.white
                        : Colors.white.withOpacity(0.5),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategories() {
    final categories = [
      {'name': 'Уход за лицом', 'icon': Icons.face},
      {'name': 'Макияж', 'icon': Icons.brush},
      {'name': 'Уход за волосами', 'icon': Icons.content_cut},
      {'name': 'Парфюмерия', 'icon': Icons.spa},
      {'name': 'Уход за телом', 'icon': Icons.self_improvement},
      {'name': 'Маникюр', 'icon': Icons.back_hand},
    ];

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          const Text(
            'Категории товаров',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 32),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 6,
              childAspectRatio: 1,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
            ),
            itemCount: categories.length,
            itemBuilder: (context, index) {
              final category = categories[index];
              return MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: () => Navigator.pushNamed(context, '/catalog'),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.grey[200]!),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          category['icon'] as IconData,
                          size: 48,
                          color: const Color(0xFFE31E24),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          category['name'] as String,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedProducts() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Хиты продаж',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextButton(
                onPressed: () => Navigator.pushNamed(context, '/catalog'),
                child: const Row(
                  children: [
                    Text('Все товары'),
                    SizedBox(width: 4),
                    Icon(Icons.arrow_forward, size: 16),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              childAspectRatio: 0.7,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
            ),
            itemCount: _featuredProducts.length,
            itemBuilder: (context, index) {
              return ProductCard(product: _featuredProducts[index]);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildBenefits() {
    final benefits = [
      {
        'icon': Icons.local_shipping_outlined,
        'title': 'Быстрая доставка',
        'description': 'Доставим заказ в течение 1-3 дней',
      },
      {
        'icon': Icons.credit_card_outlined,
        'title': 'Удобная оплата',
        'description': 'Картой, наличными или в рассрочку',
      },
      {
        'icon': Icons.verified_user_outlined,
        'title': 'Гарантия качества',
        'description': 'Только оригинальная продукция',
      },
      {
        'icon': Icons.support_agent_outlined,
        'title': 'Поддержка 24/7',
        'description': 'Всегда на связи, чтобы помочь',
      },
    ];

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
      color: Colors.grey[50],
      child: Row(
        children: benefits
            .map((benefit) => Expanded(
                  child: Column(
                    children: [
                      Icon(
                        benefit['icon'] as IconData,
                        size: 48,
                        color: const Color(0xFFE31E24),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        benefit['title'] as String,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        benefit['description'] as String,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ))
            .toList(),
      ),
    );
  }
}
