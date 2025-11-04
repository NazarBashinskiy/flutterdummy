import 'package:flutter/material.dart';

class AppHeader extends StatelessWidget implements PreferredSizeWidget {
  const AppHeader({Key? key}) : super(key: key);

  @override
  Size get preferredSize => const Size.fromHeight(120);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Column(
        children: [
          // Top bar with logo and utilities
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.1),
                  spreadRadius: 1,
                  blurRadius: 3,
                  offset: const Offset(0, 1),
                ),
              ],
            ),
            child: Row(
              children: [
                // Logo
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE31E24),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        'МАГНИТ',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 2,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'Косметикс',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w500,
                        color: Colors.black87,
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 48),
                // Search bar
                Expanded(
                  child: Container(
                    height: 44,
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Поиск товаров, брендов',
                        prefixIcon: const Icon(Icons.search, color: Colors.grey),
                        border: InputBorder.none,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 12,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 24),
                // Utility icons
                _buildIconButton(Icons.location_on_outlined, 'Магазины'),
                const SizedBox(width: 16),
                _buildIconButton(Icons.favorite_border, 'Избранное'),
                const SizedBox(width: 16),
                _buildIconButton(Icons.person_outline, 'Войти'),
                const SizedBox(width: 16),
                _buildIconButton(Icons.shopping_cart_outlined, 'Корзина'),
              ],
            ),
          ),
          // Navigation menu
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            child: Row(
              children: [
                _buildNavButton(context, 'Главная', '/'),
                const SizedBox(width: 24),
                _buildNavButton(context, 'Каталог', '/catalog'),
                const SizedBox(width: 24),
                _buildNavButton(context, 'Акции', '/promotions'),
                const SizedBox(width: 24),
                _buildNavButton(context, 'Бренды', '/catalog'),
                const SizedBox(width: 24),
                _buildNavButton(context, 'Новинки', '/catalog'),
                const SizedBox(width: 24),
                _buildNavButton(context, 'О компании', '/about'),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF6B6B),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.card_giftcard, color: Colors.white, size: 16),
                      SizedBox(width: 4),
                      Text(
                        'Подарочные карты',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIconButton(IconData icon, String label) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 24, color: Colors.black87),
          const SizedBox(height: 2),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              color: Colors.black87,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavButton(BuildContext context, String label, String route) {
    final isActive = ModalRoute.of(context)?.settings.name == route;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => Navigator.pushNamed(context, route),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 15,
            fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
            color: isActive ? const Color(0xFFE31E24) : Colors.black87,
          ),
        ),
      ),
    );
  }
}
