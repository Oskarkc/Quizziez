# 🧠 Quizziez

> Platforma interaktywna do tworzenia, dzielenia się i rozwiązywania quizów.

Aplikacja umożliwia użytkownikom sprawdzanie swojej wiedzy w trybie "Gościa" lub pełną personalizację doświadczenia po założeniu konta. Projekt kładzie nacisk na elastyczność dostępu do treści oraz trwałość danych dla zarejestrowanych twórców i graczy.

## 🚀 O projekcie

System **Quizziez** dzieli użytkowników na dwie główne grupy, oferując zróżnicowany poziom dostępu do funkcjonalności:

1.  **Goście (Niezalogowani)** – mogą przeglądać i rozwiązywać quizy "dla zabawy" bez zostawiania śladu w systemie.
2.  **Użytkownicy Zarejestrowani** – otrzymują dostęp do kreatora, historii wyników oraz zarządzania własnym profilem.

## ✨ Funkcjonalności

### 🌍 Dostęp Ogólny (Dla każdego)
Dostępne zarówno dla gości, jak i zalogowanych użytkowników:

* **Przeglądanie katalogu** – Lista wszystkich dostępnych quizów.
* **Zaawansowane filtrowanie** – Wyszukiwanie po kategoriach oraz poziomie trudności.
* **Podgląd szczegółów** – Wgląd w informacje o quizie przed rozpoczęciem.
* **Tryb "Dla zabawy"** – Możliwość rozwiązania quizu i zobaczenia wyniku końcowego bez zapisu w bazie danych (tryb incognito).

### 🔐 Dostęp Wymagający Zalogowania
Funkcje odblokowane po autoryzacji (JWT):

#### 🎮 Rozgrywka i Historia
* **Trwały zapis wyników** – Każdy ukończony quiz jest zapisywany w bazie.
* **Historia gier** – Użytkownik ma wgląd w listę rozegranych przez siebie quizów wraz z uzyskaną punktacją.

#### 🛠️ Kreator i Zarządzanie Treścią
* **Kreator Quizów** – Intuicyjny interfejs do dodawania pytań, odpowiedzi i oznaczania poprawnych rozwiązań.
* **Autorska edycja** – Możliwość edycji i usuwania quizów (system blokuje edycję treści cudzego autorstwa).

#### 👤 Zarządzanie Kontem
* **Edycja profilu** – Zmiana adresu e-mail (loginu) oraz hasła.
* **Kaskadowe usuwanie konta** – Całkowite usunięcie użytkownika z systemu powoduje automatyczne usunięcie wszystkich stworzonych przez niego quizów (Clean Database).

## 🛠️ Technologie (Tech Stack)

* **Backend:** [ .NET ]
* **Frontend:** [ React ]
* **Baza danych:** [ MSSQL ]
* **Autoryzacja:** JWT (JSON Web Tokens)


## 📄 Status Projektu
Projekt jest w fazie MVP.

---
Autor: Oskarkc
