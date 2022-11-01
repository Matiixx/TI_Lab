#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void)
{
  char *ptr, *token;
  char *data[3];

  printf("Content-type: text/html\n\n");

  printf("<html><head><title>Jezyk C - GET</title></head>\n");
  printf("<body><h2>Obsluga zadania GET</h2>\n");

  printf("Informacja przeslana w zadaniu: %s<p>\n", getenv("QUERY_STRING"));

  ptr = getenv("QUERY_STRING");
  int i = 0;
  token = strtok(ptr, "&");
  do
  {
    data[i++] = token;

    printf("  %s   \n ", token);
  } while (token = strtok(NULL, "&"));

  for (i = 0; i < 3; i++)
  {
    printf("        nazwa = %s    ", token = strtok(data[i], "="));

    printf("        wartosc = %s    <br>\n", token = strtok(NULL, "="));
  }
  printf("</body>\n</html>\n");
  return (0);
}