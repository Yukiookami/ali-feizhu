<template>
  <div class="f-rec-sec">
    <div class="img-box">
      <img :src="cover" alt="">
    </div>
    <span class="f-rec-title">{{title}}</span>
    <span class="f-rec-content">{{content}}</span>
  </div>
</template>

<script>
export default {
  // 封面，标题，简介
  props: ['cover', 'title', 'content'],
  setup () {

    return {}
  }
}
</script>

<style lang="scss" scoped>
.f-rec-sec {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  color: #333;
  width: 96px;
  margin: 10px 10px 10px 0;
  font-weight: 400;

  .img-box {
    overflow: hidden;
    border-radius: 8px;
    height: 54px;
    width: 100%;
    margin: 0 0 5px 0;

    img {
      width: 100%;
    }
  }

  .f-rec-title {
    font-size: 14px;
  }

  .f-rec-content {
    overflow: hidden; 
    font-size: 12px;
    display: block;
    font-weight: 400;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
  }
}
</style>