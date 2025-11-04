import 'package:flutter/material.dart';
import '../widgets/app_header.dart';
import '../widgets/app_footer.dart';
import '../widgets/product_card.dart';
import '../models/product.dart';

class CatalogPage extends StatefulWidget {
  const CatalogPage({Key? key}) : super(key: key);

  @override
  State<CatalogPage> createState() => _CatalogPageState();
}

class _CatalogPageState extends State<CatalogPage> {
  String _selectedCategory = 'Все';
  String _sortBy = 'Популярные';
  RangeValues _priceRange = const RangeValues(0, 5000);

  final List<String> _categories = [
    'Все',
    'Уход за лицом',
    'Макияж',
    'Уход за волосами',
    'Парфюмерия',
    'Уход за телом',
    'Маникюр',
  ];

  final List<String> _sortOptions = [
    'Популярные',
    'Цена: по возрастанию',
    'Цена: по убыванию',
    'Новинки',
    'Рейтинг',
  ];

  final List<Product> _products = [
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
    Product(
      id: '9',
      name: 'Гель для душа увлажняющий',
      brand: 'Dove',
      price: 199,
      imageUrl: '',
      category: 'Уход за телом',
      rating: 4.6,
      reviewCount: 156,
    ),
    Product(
      id: '10',
      name: 'Тональный крем матирующий',
      brand: 'Maybelline',
      price: 649,
      oldPrice: 899,
      imageUrl: '',
      category: 'Макияж',
      rating: 4.5,
      reviewCount: 203,
      hasDiscount: true,
    ),
    Product(
      id: '11',
      name: 'Маска для волос восстанавливающая',
      brand: 'Pantene',
      price: 399,
      imageUrl: '',
      category: 'Уход за волосами',
      rating: 4.4,
      reviewCount: 187,
      isNew: true,
    ),
    Product(
      id: '12',
      name: 'Лак для ногтей стойкий',
      brand: 'Sally Hansen',
      price: 329,
      imageUrl: '',
      category: 'Маникюр',
      rating: 4.6,
      reviewCount: 134,
    ),
  ];

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
                  const Text('Каталог'),
                ],
              ),
            ),
            // Content
            Container(
              padding: const EdgeInsets.all(24),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Filters sidebar
                  SizedBox(
                    width: 280,
                    child: _buildFilters(),
                  ),
                  const SizedBox(width: 24),
                  // Products grid
                  Expanded(
                    child: Column(
                      children: [
                        _buildSortBar(),
                        const SizedBox(height: 24),
                        _buildProductsGrid(),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 48),
            const AppFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildFilters() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Фильтры',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 24),
          // Categories
          const Text(
            'Категории',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          ..._categories.map((category) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: GestureDetector(
                onTap: () => setState(() => _selectedCategory = category),
                child: Row(
                  children: [
                    Icon(
                      _selectedCategory == category
                          ? Icons.radio_button_checked
                          : Icons.radio_button_unchecked,
                      size: 20,
                      color: _selectedCategory == category
                          ? const Color(0xFFE31E24)
                          : Colors.grey,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      category,
                      style: TextStyle(
                        fontSize: 14,
                        color: _selectedCategory == category
                            ? const Color(0xFFE31E24)
                            : Colors.black87,
                        fontWeight: _selectedCategory == category
                            ? FontWeight.w600
                            : FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
          const SizedBox(height: 24),
          // Price range
          const Text(
            'Цена',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          RangeSlider(
            values: _priceRange,
            min: 0,
            max: 5000,
            divisions: 50,
            activeColor: const Color(0xFFE31E24),
            labels: RangeLabels(
              '${_priceRange.start.round()} ₽',
              '${_priceRange.end.round()} ₽',
            ),
            onChanged: (values) => setState(() => _priceRange = values),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${_priceRange.start.round()} ₽'),
              Text('${_priceRange.end.round()} ₽'),
            ],
          ),
          const SizedBox(height: 24),
          // Brands
          const Text(
            'Бренды',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          ...[
            'L\'Oreal Paris',
            'Maybelline',
            'Garnier',
            'Neutrogena',
            'Vivienne Sabo'
          ].map((brand) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                children: [
                  Checkbox(
                    value: false,
                    onChanged: (value) {},
                    activeColor: const Color(0xFFE31E24),
                  ),
                  Text(brand, style: const TextStyle(fontSize: 14)),
                ],
              ),
            );
          }).toList(),
          const SizedBox(height: 24),
          // Reset button
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () {
                setState(() {
                  _selectedCategory = 'Все';
                  _priceRange = const RangeValues(0, 5000);
                });
              },
              style: OutlinedButton.styleFrom(
                foregroundColor: const Color(0xFFE31E24),
                side: const BorderSide(color: Color(0xFFE31E24)),
                padding: const EdgeInsets.symmetric(vertical: 12),
              ),
              child: const Text('Сбросить фильтры'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSortBar() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Найдено ${_products.length} товаров',
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        Row(
          children: [
            const Text('Сортировка:'),
            const SizedBox(width: 8),
            DropdownButton<String>(
              value: _sortBy,
              underline: Container(),
              items: _sortOptions.map((option) {
                return DropdownMenuItem(
                  value: option,
                  child: Text(option),
                );
              }).toList(),
              onChanged: (value) => setState(() => _sortBy = value!),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildProductsGrid() {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        childAspectRatio: 0.7,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
      ),
      itemCount: _products.length,
      itemBuilder: (context, index) {
        return ProductCard(product: _products[index]);
      },
    );
  }
}
