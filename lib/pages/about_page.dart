import 'package:flutter/material.dart';
import '../widgets/app_header.dart';
import '../widgets/app_footer.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
                  const Text('О компании'),
                ],
              ),
            ),
            // Hero section
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
                    'Магнит Косметикс',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Крупнейшая сеть магазинов косметики и парфюмерии в России',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white.withOpacity(0.9),
                    ),
                  ),
                ],
              ),
            ),
            // About content
            Container(
              padding: const EdgeInsets.all(48),
              child: Column(
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'О нас',
                              style: TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 24),
                            Text(
                              'Магнит Косметикс — это федеральная сеть специализированных магазинов, '
                              'предлагающих широкий ассортимент косметики, парфюмерии и средств по уходу. '
                              'Мы работаем с 2009 года и за это время открыли более 3000 магазинов по всей России.',
                              style: TextStyle(
                                fontSize: 16,
                                height: 1.6,
                                color: Colors.grey[700],
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Наша миссия — сделать красоту и уход доступными для каждого. '
                              'Мы тщательно отбираем товары, работаем только с проверенными брендами '
                              'и гарантируем подлинность всей продукции.',
                              style: TextStyle(
                                fontSize: 16,
                                height: 1.6,
                                color: Colors.grey[700],
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'В нашем ассортименте представлено более 15000 товаров от мировых '
                              'и отечественных производителей. Мы постоянно следим за трендами '
                              'и регулярно обновляем ассортимент новинками.',
                              style: TextStyle(
                                fontSize: 16,
                                height: 1.6,
                                color: Colors.grey[700],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 48),
                      Expanded(
                        child: Container(
                          height: 400,
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(
                            child: Icon(
                              Icons.store,
                              size: 120,
                              color: Colors.grey[400],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 64),
                  // Statistics
                  Row(
                    children: [
                      _buildStatCard('3000+', 'Магазинов', Icons.store),
                      const SizedBox(width: 24),
                      _buildStatCard('15000+', 'Товаров', Icons.shopping_bag),
                      const SizedBox(width: 24),
                      _buildStatCard('10 млн+', 'Покупателей', Icons.people),
                      const SizedBox(width: 24),
                      _buildStatCard('500+', 'Брендов', Icons.badge),
                    ],
                  ),
                  const SizedBox(height: 64),
                  // Values
                  const Text(
                    'Наши ценности',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 32),
                  Row(
                    children: [
                      _buildValueCard(
                        'Качество',
                        'Только оригинальная продукция от проверенных производителей',
                        Icons.verified,
                      ),
                      const SizedBox(width: 24),
                      _buildValueCard(
                        'Доступность',
                        'Демократичные цены и регулярные акции для наших покупателей',
                        Icons.local_offer,
                      ),
                      const SizedBox(width: 24),
                      _buildValueCard(
                        'Сервис',
                        'Профессиональная консультация и помощь в выборе товаров',
                        Icons.support_agent,
                      ),
                    ],
                  ),
                  const SizedBox(height: 64),
                  // Contact section
                  Container(
                    padding: const EdgeInsets.all(48),
                    decoration: BoxDecoration(
                      color: Colors.grey[50],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          'Свяжитесь с нами',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 32),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            _buildContactInfo(
                              Icons.phone,
                              'Телефон',
                              '8-800-200-90-02',
                            ),
                            const SizedBox(width: 64),
                            _buildContactInfo(
                              Icons.email,
                              'Email',
                              'info@magnitcosmetic.ru',
                            ),
                            const SizedBox(width: 64),
                            _buildContactInfo(
                              Icons.schedule,
                              'Режим работы',
                              'Круглосуточно',
                            ),
                          ],
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

  Widget _buildStatCard(String number, String label, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey[200]!),
        ),
        child: Column(
          children: [
            Icon(icon, size: 48, color: const Color(0xFFE31E24)),
            const SizedBox(height: 16),
            Text(
              number,
              style: const TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: Color(0xFFE31E24),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildValueCard(String title, String description, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey[200]!),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFE31E24).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, size: 40, color: const Color(0xFFE31E24)),
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              description,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600],
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContactInfo(IconData icon, String label, String value) {
    return Column(
      children: [
        Icon(icon, size: 40, color: const Color(0xFFE31E24)),
        const SizedBox(height: 12),
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[600],
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
