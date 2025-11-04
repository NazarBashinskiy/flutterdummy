class Product {
  final String id;
  final String name;
  final String brand;
  final double price;
  final double? oldPrice;
  final String imageUrl;
  final String category;
  final double rating;
  final int reviewCount;
  final bool isNew;
  final bool hasDiscount;

  Product({
    required this.id,
    required this.name,
    required this.brand,
    required this.price,
    this.oldPrice,
    required this.imageUrl,
    required this.category,
    this.rating = 0.0,
    this.reviewCount = 0,
    this.isNew = false,
    this.hasDiscount = false,
  });

  double get discountPercent {
    if (oldPrice == null || oldPrice! <= price) return 0;
    return ((oldPrice! - price) / oldPrice! * 100).roundToDouble();
  }
}
