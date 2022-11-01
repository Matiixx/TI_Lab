#include <iostream>
#include <string>
int main()
{
  std::string lenstr;
  char input[80];
  long len;

  std::cout << "Content-type: text/html\n\n";
  std::cout << "<title>RESPONSE</title>";

  lenstr = getenv("CONTENT_LENGTH");

  std::cout << lenstr << "\n";
  // if (lenstr == NULL || sscanf(lenstr, "%ld", &len) != 1 || len > 80)
  // {
  //   std::cout << "<p>Error CONTENT_LENGTH = " << len << "</p>";
  // }
  // else
  // {
  //   fgets(input, len + 1, stdin);
  //   std::cout << "\n"
  //             << input;
  // }

  return 0;
}