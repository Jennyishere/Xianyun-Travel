
export const actions= {
    citySearch(store, data) {
      return this.$axios({
            url: "/airs/city",
            params: { name: data }
          }).then(res => {
            const { data } = res.data;
            //   因为下拉的数组需要的是一个value的键值对，所以要改造数据
            const selectData = data.map(v => {
              v.value = v.name.replace("市", "");
              // 改造后要记得把v值return回去
              return v;
            });
            // console.log(selectData); 把data存起来
             return selectData;
           
          });
    }
}