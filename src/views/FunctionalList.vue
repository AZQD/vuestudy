<template functional>
  <div v-bind="data.attrs" v-on="listeners">
    <h1>{{ props.title }}</h1>
    <div>
      <p v-for="(item,index) in props.items" :key="index" >{{item}}</p>
    </div>
  </div>
</template>
