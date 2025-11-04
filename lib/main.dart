import 'package:flutter/material.dart';
import 'pages/home_page.dart';
import 'pages/catalog_page.dart';
import 'pages/promotions_page.dart';
import 'pages/about_page.dart';

void main() => runApp(const MagnitCosmeticsApp());

class MagnitCosmeticsApp extends StatelessWidget {
  const MagnitCosmeticsApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Магнит Косметикс',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFFE31E24), // Magnit red
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFE31E24),
          primary: const Color(0xFFE31E24),
          secondary: const Color(0xFFFF6B6B),
        ),
        scaffoldBackgroundColor: Colors.white,
        fontFamily: 'Roboto',
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 1,
        ),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/catalog': (context) => const CatalogPage(),
        '/promotions': (context) => const PromotionsPage(),
        '/about': (context) => const AboutPage(),
      },
    );
  }
}
