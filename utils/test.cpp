//20154536 李天志 计算机1508 Vigenere算法

#include <cstdio>
#include <iostream>
#include <cstring>
using namespace std;
const int MAXN = 1e3+7;
int main(){
  char temp;
  for(int i=0;i<26;i++){
    printf("%c ",'a'+i);
  }
  printf("\n");
    for(int i=0;i<26;i++){
      temp = 'n'-i;
      if(temp<'a'){
        temp = 'n'-i+26;
      }
      printf("%c ",temp);
    }
    printf("\n");
      for(int i=0;i<26;i++){
        temp = 'e'-i;
        if(temp<'a'){
          temp = 'e'-i+26;
        }
        printf("%c ",temp);
      }
      printf("\n");
        for(int i=0;i<26;i++){
          temp = 'u'-i;
          if(temp<'a'){
            temp = 'u'-i+26;
          }
          printf("%c ",temp);
        }
        printf("\n");
  return 0;
}
