// トッピング生成
const makeToppings = () => {
    const elem = document.getElementById('toppings-main');
    toppings.forEach((topping) => {
        const label = document.createElement('label');
        const span = document.createElement('span');
        const input = document.createElement('input');
        span.textContent = `${topping.name}(${topping.price})`;
        input.type = 'checkbox';
        input.name = 'toppings';
        input.value = topping.price;
        input.setAttribute('autocomplete', 'off');
        label.appendChild(input);
        label.appendChild(span);
        elem.appendChild(label);
    })
}

// カレーの値段計算
const refreshSum = () => {
    const curry = document.getElementById('curry');
    const sauce = Number(curry.sauce.value);
    const rice = Number(curry.rice.value);
    const spice = Number(curry.spiciness.value);
    const sweet = Number(curry.sweetness.value);
    const toppings = Number(culcToppings(curry));
    const sum = sauce + rice + spice + sweet + toppings;
    const remind = 900 - sum; // 900円まであと...

    // 合計値dom更新
    document.getElementById('sum').textContent = sum;
    if(remind>0) {
        document.getElementById('remind').textContent = 900 - sum;
        document.getElementById('remindText').removeAttribute('style');
        document.getElementById('isValid').setAttribute('style', 'display: none');
    } else {
        document.getElementById('isValid').removeAttribute('style');
        document.getElementById('remindText').setAttribute('style', 'display: none');
    }
}

// 名称生成 TODO
const generateCurryName = (curry) => {
    return null;
}
// トッピング合計値計算
const culcToppings = (curry) => {
    let sum = 0;
    [].forEach.call(curry.toppings, (topping) => {
        sum += topping.checked ? Number(topping.value) : 0;
    })
    return sum;
}

// 起動時イベント
window.addEventListener('load', () => {
    console.log('カレーは飲み物です');
    makeToppings();
    refreshSum();

    // input全てにonchangeを仕込む
    [].forEach.call(document.querySelectorAll('input'), (input) => {
        input.addEventListener('change', ()=> {
            refreshSum();
        })
    });
});
