# 산성비 게임

## 소개

bootstrap, react와 redux를 이용하여 구현한 타자 연습을 위한 산성비 게임



### 구조

```
+ 시작 페이지
 + 게임 진행하는 페이지
 + 기록 페이지
```

### 특징

```
 + 게임을 진행하기 위한 변수들은 모두 redux에서 관리한다.
 + requestAnimationFrame에 의해 update시 state 및 하위 props를 변경시켜 오직 이 때 re rendering되도록 만들었다.
 + 기록은 localStorage에 저장했다.
 + 레벨 별 나오는 데이터는 json 파일에 저장했다.
 + bootstrap도 사용했는데 react에서 더 쉽게 사용하기 위해 react-bootstrap 사용했다.

```

### 게임 내의 동작

#### 물방울 떨어지기
![acid-rain1](https://github.com/goinghome0331/acid-rain/blob/master/img/acid-rain1.gif)

#### 물방울 안에 단어 맞히기
![acid-rain2](https://github.com/goinghome0331/acid-rain/blob/master/img/acid-rain2.gif)

#### 특수 이벤트 발생
![acid-rain3](https://github.com/goinghome0331/acid-rain/blob/master/img/acid-rain3.gif)
```
 - 물방울 내의 단어 안보이게 하기
```
![acid-rain4](https://github.com/goinghome0331/acid-rain/blob/master/img/acid-rain4.gif)
```
 - 물방울 내려오는 속도 빠르게 하기
```

### 추후 개선하고 싶은 사항

```
+ 물방울 안에 있는 단어를 맞히면 물방울이 없어질 때 터지는 애니메이션을 넣고자 했으나 그러한 spritesheet 이미지를 찾지 못했다.

```


