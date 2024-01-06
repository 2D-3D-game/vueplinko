<template>
  <div :style="{ overflowX: 'auto' }">
    <table>
      <tr>
        <th>{{ $t("rank") }}</th>
        <th>{{ $t("user") }}</th>
        <th>{{ $t("date") }}</th>
        <th>{{ $t("multiplier") }}</th>
        <th>{{ $t("bet") }}</th>
        <th>{{ $t("payout") }}</th>
      </tr>
      <tr>
        <td>
          <img :src="'/image/reward1.png'" alt="Image" width="20" height="21" />
        </td>
        <td>Los</td>
        <td>2023年11月22日</td>
        <td>
          2999.400119...
          <img :src="'/image/crypto1.png'" alt="Image" width="14" height="14" />
        </td>
        <td>1,000x</td>
        <td>
          2999.400119...
          <img :src="'/image/crypto1.png'" alt="Image" width="14" height="14" />
        </td>
      </tr>
      <tr>
        <td>
          <img :src="'/image/reward2.png'" alt="Image" width="20" height="21" />
        </td>
        <td>
          <img :src="'/image/cap.png'" alt="Image" width="14" height="14" />
          隐身
        </td>
        <td>2023年9月24日</td>
        <td>
          1.411109923
          <img :src="'/image/crypto2.png'" alt="Image" width="14" height="14" />
        </td>
        <td>1,000x</td>
        <td>
          1880.4010119...
          <img :src="'/image/crypto2.png'" alt="Image" width="14" height="14" />
        </td>
      </tr>
      <tr>
        <td>
          <img :src="'/image/reward3.png'" alt="Image" width="20" height="21" />
        </td>
        <td>Los</td>
        <td>2023年11月22日</td>
        <td>
          2999.400119...
          <img :src="'/image/crypto1.png'" alt="Image" width="14" height="14" />
        </td>
        <td>1,000x</td>
        <td>
          2999.400119...
          <img :src="'/image/crypto1.png'" alt="Image" width="14" height="14" />
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@import "../../assets/css/bigreward.css";
</style>
