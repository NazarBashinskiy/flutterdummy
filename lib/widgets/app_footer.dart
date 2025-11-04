import 'package:flutter/material.dart';

class AppFooter extends StatelessWidget {
  const AppFooter({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF2C2C2C),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
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
                      'О компании',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFooterLink('О нас'),
                    _buildFooterLink('Вакансии'),
                    _buildFooterLink('Новости'),
                    _buildFooterLink('Партнерам'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Покупателям',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFooterLink('Как сделать заказ'),
                    _buildFooterLink('Оплата и доставка'),
                    _buildFooterLink('Возврат товара'),
                    _buildFooterLink('Программа лояльности'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Контакты',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFooterLink('8-800-200-90-02'),
                    _buildFooterLink('info@magnitcosmetic.ru'),
                    const SizedBox(height: 8),
                    const Text(
                      'Круглосуточная поддержка',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Мы в соцсетях',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        _buildSocialIcon(Icons.facebook),
                        const SizedBox(width: 12),
                        _buildSocialIcon(Icons.web),
                        const SizedBox(width: 12),
                        _buildSocialIcon(Icons.telegram),
                        const SizedBox(width: 12),
                        _buildSocialIcon(Icons.camera_alt),
                      ],
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Скачать приложение',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _buildAppButton('App Store'),
                        const SizedBox(width: 8),
                        _buildAppButton('Google Play'),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          const Divider(color: Colors.white24),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '© 2025 Магнит Косметикс. Все права защищены.',
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 13,
                ),
              ),
              Row(
                children: [
                  _buildFooterLink('Политика конфиденциальности', small: true),
                  const SizedBox(width: 16),
                  _buildFooterLink('Пользовательское соглашение', small: true),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFooterLink(String text, {bool small = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Text(
          text,
          style: TextStyle(
            color: Colors.white70,
            fontSize: small ? 13 : 14,
            decoration: TextDecoration.none,
          ),
        ),
      ),
    );
  }

  Widget _buildSocialIcon(IconData icon) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.white24,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: Colors.white, size: 20),
      ),
    );
  }

  Widget _buildAppButton(String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white24,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
