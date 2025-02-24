import re

def my_t9(input_numbers: str):
    pattern_words = {
        '2': 'a' 'b' 'c',
        '3': 'd' 'e' 'f',
        '4': 'g' 'h' 'i',
        '5': 'j' 'k' 'l',
        '6': 'm' 'n' 'o',
        '7': 'p' 'q' 'r' 's',
        '8': 't' 'u' 'v',
        '9': 'w' 'x' 'y' 'z'
    }
    # Считываем слова из файла
    with open('words.txt', 'r') as file:
        words = [word.strip() for word in file.readlines()]

    # Создаем регулярное выражение для поиска слов
    pattern_str = '^' + ''.join(pattern_words[digit] for digit in input_numbers) + '$'

    # Объединяем слова в строку через пробел
    words_str = ' '.join(words)

    # Используем re.findall() с полученной строкой
    matched_words = re.findall(pattern_str, words_str, re.IGNORECASE)

    return matched_words

if __name__ == '__main__':
    numbers = input("Введите последовательность цифр: ")
    words = my_t9(numbers)
    print(words)
