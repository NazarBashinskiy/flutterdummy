import 'package:flutter/material.dart';
import '../widgets/app_header.dart';
import '../widgets/app_footer.dart';

class PromotionsPage extends StatelessWidget {
  const PromotionsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final promotions = [
      {
        'title': 'Скидки до 50% на уход за кожей',
        'description':
            'Огромный выбор кремов, сывороток и масок для лица по специальным ценам',
        'discount': '50%',
        'endDate': '31 декабря',
        'color': const Color(0xFFE31E24),
      },
      {
        'title': 'Вторая упаковка в подарок',
        'description':
            'При покупке декоративной косметики - второй товар в подарок',
        'discount': '1+1',
        'endDate': '15 декабря',
        'color': const Color(0xFFFF6B6B),
      },
      {
        'title': 'Подарочные наборы со скидкой',
        'description':
            'Готовые наборы косметики - отличный подарок с экономией до 40%',
        'discount': '40%',
        'endDate': '25 декабря',
        'color': const Color(0xFF9C27B0),
      },
      {
        'title': 'Программа лояльности',
        'description':
            'Копите баллы за покупки и получайте скидки до 20% на следующие заказы',
        'discount': '20%',
        'endDate': 'Постоянно',
        'color': const Color(0xFF4CAF50),
      },
      {
        'title': 'Бесплатная доставка',
        'description':
            'При заказе от 1500 рублей - доставка в подарок по всей России',
        'discount': '0₽',
        'endDate': 'Постоянно',
        'color': const Color(0xFF2196F3),
      },
      {
        'title': 'Новинки со скидкой 30%',
        'description':
            'Первая неделя продаж новых товаров - специальная цена',
        'discount': '30%',
        'endDate': 'На новинки',
        'color': const Color(0xFFFF9800),
      },
    ];

    return Scaffold(
      appBar: const AppHeader(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Breadcrumbs
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Row(
                children: [
                  TextButton(
                    onPressed: () => Navigator.pushNamed(context, '/'),
                    child: const Text('Главная'),
                  ),
                  const Icon(Icons.chevron_right, size: 16),
                  const Text('Акции'),
                ],
              ),
            ),
            // Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(48),
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
              child: Column(
                children: [
                  const Text(
                    'Актуальные акции и спецпредложения',
                    style: TextStyle(
                      fontSize: 42,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Экономьте на покупке косметики и парфюмерии',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white.withOpacity(0.9),
                    ),
                  ),
                ],
              ),
            ),
            // Promotions grid
            Container(
              padding: const EdgeInsets.all(24),
              child: GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                  childAspectRatio: 1.2,
                  crossAxisSpacing: 24,
                  mainAxisSpacing: 24,
                ),
                itemCount: promotions.length,
                itemBuilder: (context, index) {
                  final promo = promotions[index];
                  return _buildPromotionCard(
                    context,
                    promo['title'] as String,
                    promo['description'] as String,
                    promo['discount'] as String,
                    promo['endDate'] as String,
                    promo['color'] as Color,
                  );
                },
              ),
            ),
            // Newsletter subscription
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
              padding: const EdgeInsets.all(48),
              decoration: BoxDecoration(
                color: Colors.grey[50],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  const Text(
                    'Подпишитесь на рассылку',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Получайте информацию о новых акциях и специальных предложениях',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: 500,
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              hintText: 'Введите ваш email',
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: BorderSide(color: Colors.grey[300]!),
                              ),
                              contentPadding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 16,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFE31E24),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 32,
                              vertical: 16,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                          child: const Text(
                            'Подписаться',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const AppFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildPromotionCard(
    BuildContext context,
    String title,
    String description,
    String discount,
    String endDate,
    Color color,
  ) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => Navigator.pushNamed(context, '/catalog'),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey[200]!),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.1),
                spreadRadius: 1,
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 100,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(12),
                  ),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      top: 16,
                      right: 16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          color: color,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          discount,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 16,
                      left: 16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            Icon(Icons.access_time, size: 14, color: color),
                            const SizedBox(width: 4),
                            Text(
                              'До $endDate',
                              style: TextStyle(
                                fontSize: 12,
                                color: color,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        description,
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                          height: 1.4,
                        ),
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const Spacer(),
                      Row(
                        children: [
                          Text(
                            'Подробнее',
                            style: TextStyle(
                              fontSize: 14,
                              color: color,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Icon(Icons.arrow_forward, size: 16, color: color),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
