// DOM生成
const makeDOM = (name, data, type) => {
    const elem = document.getElementById(`${name}-main`);
    data.forEach((row, i) => {
        const label = document.createElement('label');
        const span = document.createElement('span');
        const input = document.createElement('input');
        const id = name+(i+1);
        span.textContent = `${row.name}(${row.price}円)`;
        input.type = type;
        input.name = name;
        input.value = row.price;
        input.setAttribute('autocomplete', 'off');
        input.id = id;
        if (row.default) {
            input.setAttribute('checked', true);
        }
        label.setAttribute('for',id);
        label.appendChild(span);
        elem.appendChild(input);
        elem.appendChild(label);
        
    })
}

// カレーの値段計算
const target = 1000; // 予定金額
const refreshSum = () => {
    const curry = document.getElementById('curry');
    const sauce = Number(curry.sauce.value);
    const rice = Number(calcRice(curry));
    const spice = Number(curry.spiciness.value);
    const sweet = Number(curry.sweetness.value);
    const toppings = Number(calcToppings(curry));
    const sum = sauce + rice + spice + sweet + toppings;
    const remind = target - sum; // 予定金額まであと...

    // 合計値dom更新
    document.getElementById('sum').textContent = sum;
    if(remind>0) {
        document.getElementById('remind').textContent = target - sum;
        document.getElementById('remindText').removeAttribute('style');
        document.getElementById('isValid').setAttribute('style', 'display: none');
    } else {
        document.getElementById('isValid').removeAttribute('style');
        document.getElementById('remindText').setAttribute('style', 'display: none');
    }
    document.getElementById('curryName').textContent = generateCurryName(curry);

}

// 名称生成 
const generateCurryName = (curry) => {
    let curryName = '';
    [].some.call(curry.sauce, (topping, i) => {
        if (topping.checked) {
            curryName += sauce[i].name;
            return true;
        }
    });

    let toppingCount = 0;
    [].forEach.call(curry.toppings, (topping, i) => {
        // ここイケてない
        if (topping.checked) {
            curryName += toppings[i].name;
            toppingCount++;
        }
        // curryName += topping.checked ? toppings[i].name : '';
    })
    curryName += toppingCount > 1 ? 'ミックス' : '';

    curryName += curry.rice.value + '00g';
    [].some.call(curry.spiciness, (s, i) => {
        if (s.checked && s.value != '0') {
            curryName += spiciness[i].name+'辛';
            return true;
        }
    });
    [].some.call(curry.sweetness, (s, i) => {
        if (s.checked && s.value != '0') {
            curryName += spiciness[i].name+'甘';
            return true;
        }
    });

    return curryName;
}
const calcRice = (curry) => {
    const rice = Number(curry.rice.value);
    if(rice === 2){
        return -52; // 小盛りライス割引
    } else {
        return (rice - 3) * 110 //
    }
}
// トッピング合計値計算
const calcToppings = (curry) => {
    let sum = 0;
    [].forEach.call(curry.toppings, (topping) => {
        sum += topping.checked ? Number(topping.value) : 0;
    })
    return sum;
}

// イニシャライザ
const initialize = () => {
    // DOM整備
    makeDOM('sauce', sauce, 'radio');
    makeDOM('spiciness', spiciness, 'radio');
    makeDOM('sweetness', sweetness, 'radio');
    makeDOM('toppings', toppings, 'checkbox');
    [].forEach.call(document.getElementsByName('target'), (elem) => {
        elem.textContent = target;
    });
    // 描画更新
    refreshSum();    

    // 価格更新リアルタイム化、input全てにonchangeを仕込む
    [].forEach.call(document.querySelectorAll('input'), (input) => {
        input.addEventListener('change', ()=> {
            refreshSum();
        })
    });
    // おまけ　デバッグ用ボタン
    document.getElementById('allCheck').addEventListener('click', () => {
        const toppings = document.getElementById('curry').toppings;
        [].forEach.call(toppings, (topping) => {
            topping.checked = true;
        })
        refreshSum();
    });
    document.getElementById('reset').addEventListener('click', () => {
        const toppings = document.getElementById('curry').toppings;
        [].forEach.call(toppings, (topping) => {
            topping.checked = false;
        })
        refreshSum();
    });
}

// 起動時イベント
window.addEventListener('load', () => {
    console.log(`目指せ${target}円`);
    initialize();
});
