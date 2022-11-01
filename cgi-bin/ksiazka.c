#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

char *replace_char(char *str, char find, char replace)
{
  char *current_pos = strchr(str, find);
  while (current_pos)
  {
    *current_pos = replace;
    current_pos = strchr(current_pos, find);
  }
  return str;
}

int main(void)
{
  char *ptr, *token;
  char *data[2];
  printf("%s%c%c\n", "Content-Type:text/html;charset=utf-8", 13, 10);
  printf("<link href=\"../Lab5/ksiazka.css\" rel=\"stylesheet\" type=\"text/css\" /><TITLE>Ksiazki response</TITLE>");

  ptr = getenv("QUERY_STRING");
  int i = 0;
  token = strtok(ptr, "&");

  do
  {
    data[i++] = token;

  } while ((token = strtok(NULL, "&")));

  char *tytul, *autor;

  token = strtok(data[0], "=");
  tytul = strtok(NULL, "=");
  tytul = replace_char(tytul, '+', ' ');

  token = strtok(data[1], "=");
  autor = strtok(NULL, "=");
  autor = replace_char(autor, '+', ' ');

  char *ip = getenv("REMOTE_ADDR");

  time_t t = time(NULL);
  struct tm tm = *localtime(&t);
  char dateNow[50];

  sprintf(dateNow, "%d/%02d/%02d %02d:%02d:%02d", tm.tm_year + 1900,
          tm.tm_mon + 1, tm.tm_mday, tm.tm_hour, tm.tm_min, tm.tm_sec);

  // Save to file
  FILE *fileptr = fopen("ksiazki.dat", "a");
  if (autor != NULL && tytul != NULL)
    fprintf(fileptr, "%s;%s;%s;%s;\n", tytul, autor, dateNow, ip);
  fclose(fileptr);

  // Read file
  fileptr = fopen("ksiazki.dat", "r");
  char *line = NULL;
  size_t len = 0;
  ssize_t read;

  printf("<h4>REKORDY DOSTEPNE W BAZIE DANYCH</h4>");
  printf("<table>");
  printf("<thead><tr><th>tytul</th><th>autor</th><th>date</th><th>IP</th></tr></thead>");

  while ((read = getline(&line, &len, fileptr)) != -1)
  {
    printf("<tr>");

    printf("<td>");
    token = strtok(line, ";");
    printf("%s", token);
    printf("</td>");

    printf("<td>");
    token = strtok(NULL, ";");
    printf("%s", token);
    printf("</td>");

    printf("<td>");
    token = strtok(NULL, ";");
    printf("%s", token);
    printf("</td>");

    printf("<td>");
    token = strtok(NULL, ";");
    printf("%s", token);
    printf("</td>");

    printf("</tr>");
  }
  printf("</table>");

  fclose(fileptr);
  if (line)
    free(line);

  printf("</body>\n</html>\n");

  return 0;
}