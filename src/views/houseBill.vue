<template>
  <div class="house-bill-ct" v-if="true">
    <p>房屋成本计算器</p>
    <div>
      <span>贷款方式:</span>
      <input
        type="radio"
        name="averageCapital"
        id="averageCapital"
        value="1"
        v-model="whichWayOfBuyHouseType"
      />
      <label for="averageCapital">等额本金</label>

      <input
        type="radio"
        name="principalInterest"
        id="principalInterest"
        value="2"
        v-model="whichWayOfBuyHouseType"
      />
      <label for="principalInterest">等额本息</label>
    </div>
    <div>
      买房总额+首付和首付的存款利息+月供金额和月供金额的利息

      <div>
        <label for="unitPrice">房价（元/m^2)</label>
        <input
          type="number"
          name="unitPrice"
          id="unitPrice"
          v-model="unitPrice"
        />
      </div>
      <div>
        <label for="house_area">房屋面积：</label>
        <input
          type="number"
          name="house_area"
          id="house_area"
          v-model="house_area"
        />
      </div>
      <p>房屋总成本： {{ house_cost }}</p>

      <div>
        <div>
          <label for="commercialLoan">商业贷款金额 （w)</label>
          <input
            type="number"
            name="commercialLoan"
            id="commercialLoan"
            v-model="commercialLoan"
          />
          <label for="commercialLoanRate">商业贷款金额利率（年利率%）</label>
          <input
            type="number"
            name="commercialLoanRate"
            id="commercialLoanRate"
            v-model="commercialLoanRate"
          />
        </div>
        <div>
          <label for="providentFundLoans">公积金贷款金额（w)</label>
          <input
            type="number"
            name="providentFundLoans"
            id="providentFundLoans"
            v-model="providentFundLoans"
          />
          <label for="providentFundLoansRate"
            >公积金贷款金额利率（年利率%）</label
          >
          <input
            type="number"
            name="providentFundLoansRate"
            id="providentFundLoansRate"
            v-model="providentFundLoansRate"
          />
        </div>
        <div>
          <label for="month">还款期数：</label>
          <input type="number" v-model="m" id="month" />
        </div>
        <div>
          <p>
            月供金额：{{ m_downPayment }}=
            <span>商业月供金额： {{ commercialLoanRes["月供"] }}</span
            >+
            <span>公积金月供金额： {{ providentFundLoansRes["月供"] }}</span>
          </p>
        </div>
      </div>
      <p>
        <label for="year_rate_init">年化利率：</label>
        <input type="number" v-model="year_rate_init" id="year_rate_init" />
      </p>
      <div>
        <h2>已还期数计算</h2>
        <div>
          <label for="m_alreadyRepaid">还款期数：</label>
          <input type="number" v-model="m_alreadyRepaid" id="m_alreadyRepaid" />
        </div>
        <div>
          <h3>首付计算</h3>
          <p>
            <label for="downPayment">首付款：</label>
            <input type="number" v-model="downPayment" id="downPayment" />
          </p>
          <p>首付获利的的利息累计：{{ downPayment_interest_count }}</p>
          <p>首付累计的成本: {{ downPayment_total_cost }}</p>
        </div>
        <div>
          <h3>月供计算</h3>
          <div>
            <p>
              <span>月供金额：{{ m_downPayment }}</span>
              <span>=</span>
              <span>商业月供金额： {{ commercialLoanRes["月供"] }}</span>
              <span> + </span>
              <span>公积金月供金额： {{ providentFundLoansRes["月供"] }}</span>
            </p>
          </div>

          <p>月供金额获利的利息：{{ m_interest }} （等差数列）</p>
          <p>月供金额获利的利息累计: {{ m_interest_count }}</p>
          <p>月供金额累计的成本(利息累计+月供金额): {{ m_total_cost }}</p>
        </div>
      </div>

      <div>
        <h3>总累计成本,是按照等额本息分成360期，然后已还多少期进行计算的</h3>
        <p>
          获利利息的累计：{{
            (downPayment_interest_count + m_interest_count).toFixed(4)
          }}
        </p>
        <p>
          已还月供总额+已还月供总额产生的获利利息+首付所产生的利息+首付
          累计的成本：
          {{ (m_total_cost + downPayment_total_cost).toFixed(4) }}
        </p>

        <div>
          <p>已还月供过程中所支出的利息：{{ m_interest_ }}</p>
          <div>
            <ul class="ul-css">
              <li
                class="li-css"
                v-for="(item, index) in commercialLoanRes['还款记录表']"
                :key="index"
              >
                <span> 月供还款利息: </span>
                <span>
                  {{
                    (
                      item["月利息"] +
                      providentFundLoansRes["还款记录表"][index]["月利息"]
                    ).toFixed(4)
                  }}
                </span>
                <span class="small">=</span>
                <span>商业月供利息： </span>
                <span>
                  {{ item["月利息"] }}
                </span>
                <span class="small">+</span>
                <span>公积金月供利息： </span>
                <span>
                  {{ providentFundLoansRes["还款记录表"][index]["月利息"] }}
                </span>
                <!-- <span> 月本金: {{ item["月本金"] }} </span>
              <span> 剩余还款: {{ item["剩余还款"] }} </span> -->
              </li>
            </ul>
          </div>
        </div>
        <p>
          不亏本：总成本=买房时的总价+已还款期数的的利息+税费(未算)+其他费用（未加）
          {{ house_cost + m_interest_ }}
        </p>
        <p>
          二手房购买的成本（不含税） 房价/平方数 :
          {{ ((house_cost + m_interest_) / house_area).toFixed(4) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, effect } from "vue";
export default {
  name: "houseBill",
  setup() {
    //等额本息计算
    const benxi = (totalNum, month, lilv) => {
      // month 改为month 进行每个月的推断
      //每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
      //   let mouth = parseInt(month) * 12,
      let mouth = parseInt(month),
        mouthlilv = parseFloat(lilv) / 12,
        dknum = parseFloat(totalNum) * 10000;
      //每月月供
      let yuegong =
        (dknum * mouthlilv * Math.pow(1 + mouthlilv, mouth)) /
        (Math.pow(1 + mouthlilv, mouth) - 1);
      //总利息=还款月数×每月月供额-贷款本金
      let totalLixi = mouth * yuegong - dknum;
      //还款总额 总利息+贷款本金
      let totalPrice = totalLixi + dknum,
        leftFund = totalLixi + dknum;

      //循环月份
      let mouthdataArray = [],
        nowmouth = new Date().getMonth(),
        realmonth = 0;

      for (let i = 1; i <= mouth; i++) {
        realmonth = nowmouth + i;
        let yearlist = Math.floor(i / 12);

        realmonth = realmonth - 12 * yearlist;

        if (realmonth > 12) {
          realmonth = realmonth - 12;
        }
        //console.log(realmonth)
        //每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
        let yuelixi =
          (dknum *
            mouthlilv *
            (Math.pow(1 + mouthlilv, mouth) - Math.pow(1 + mouthlilv, i - 1))) /
          (Math.pow(1 + mouthlilv, mouth) - 1);
        //每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
        let yuebenjin =
          (dknum * mouthlilv * Math.pow(1 + mouthlilv, i - 1)) /
          (Math.pow(1 + mouthlilv, mouth) - 1);
        leftFund = leftFund - (yuelixi + yuebenjin);
        if (leftFund < 0) {
          leftFund = 0;
        }
        mouthdataArray[i - 1] = {
          月份: realmonth + "月",
          月利息: Number(yuelixi.toFixed(4)),
          月本金: Number(yuebenjin.toFixed(4)),
          剩余还款: leftFund.toFixed(4),
          月供: Number((Number(yuelixi) + Number(yuebenjin)).toFixed(4)),
        };
      }
      return {
        月供: Number(yuegong.toFixed(4)),
        总利息: Number(totalLixi.toFixed(4)),
        还款总额: Number(totalPrice.toFixed(4)),
        还款记录表: mouthdataArray,
        贷款总金额: totalNum,
        还款期数: month,
      };
    };

    //等额本金计算
    let benjin = (num, year, lilv) => {
      let mouth = parseInt(year),
        mouthlilv = parseFloat(lilv) / 12,
        dknum = parseFloat(num) * 10000,
        yhbenjin = 0; //首月还款已还本金金额是0
      //每月应还本金=贷款本金÷还款月数
      let everymonthyh = dknum / mouth;
      //每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
      let yuegong = everymonthyh + (dknum - yhbenjin) * mouthlilv;
      //每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
      let yuegongdijian = everymonthyh * mouthlilv;
      //总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
      let totalLixi =
        ((everymonthyh +
          dknum * mouthlilv +
          (dknum / mouth) * (1 + mouthlilv)) /
          2) *
          mouth -
        dknum;
      //还款总额 总利息+贷款本金
      let totalPrice = totalLixi + dknum,
        leftFund = totalLixi + dknum;

      //循环月份
      let mouthdataArray = [],
        nowmouth = new Date().getMonth(),
        realmonth = 0;

      for (let i = 1; i <= mouth; i++) {
        realmonth = nowmouth + i;
        let yearlist = Math.floor(i / 12);

        realmonth = realmonth - 12 * yearlist;

        if (realmonth > 12) {
          realmonth = realmonth - 12;
        }
        yhbenjin = everymonthyh * (i - 1);
        let yuebenjin = everymonthyh + (dknum - yhbenjin) * mouthlilv;
        //每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
        let yuelixi = (dknum - yhbenjin) * mouthlilv;
        leftFund = leftFund - yuebenjin;
        if (leftFund < 0) {
          leftFund = 0;
        }
        mouthdataArray[i - 1] = {
          月份: realmonth + "月",
          月利息: Number(yuelixi.toFixed(4)),
          月本金: Number(everymonthyh.toFixed(4)),
          剩余还款: leftFund.toFixed(4),
          月供: Number((Number(yuelixi) + Number(everymonthyh)).toFixed(4)),
        };
      }
      return {
        月供: Number(yuegong.toFixed(4)),
        总利息: Number(totalLixi.toFixed(4)),
        还款总额: Number(totalPrice.toFixed(4)),
        每月月供递减额: yuegongdijian,
        还款记录表: mouthdataArray,
        贷款总金额: num,
        还款期数: year,
      };
    };

    let whichWayOfBuyHouseType = ref("2");

    let whichWayOfBuyHouseFn = () => {
      return whichWayOfBuyHouseType.value == "2" ? benxi : benjin;
    };

    let downPayment = ref(957819.62); // 首付款
    let house_area = ref(97.67); // 房屋面积
    let unitPrice = ref(26086); // 单价
    let house_cost = computed(() => house_area.value * unitPrice.value); // 房价

    let commercialLoan = ref(99);
    let commercialLoanRate = ref(4.1);
    let providentFundLoans = ref(60);
    let providentFundLoansRate = ref(3.1);

    // 还款期数
    let m = ref(360);

    // 商业贷款的结果
    let commercialLoanRes = computed(() =>
      whichWayOfBuyHouseFn()(
        commercialLoan.value,
        m.value,
        commercialLoanRate.value / 100
      )
    );
    // 公积金贷款的结果
    let providentFundLoansRes = computed(() =>
      whichWayOfBuyHouseFn()(
        providentFundLoans.value,
        m.value,
        providentFundLoansRate.value / 100
      )
    );

    effect(() => {
      commercialLoanRes.value = whichWayOfBuyHouseFn()(
        commercialLoan.value,
        m.value,
        commercialLoanRate.value / 100
      );
      providentFundLoansRes.value = whichWayOfBuyHouseFn()(
        providentFundLoans.value,
        m.value,
        providentFundLoansRate.value / 100
      );
    }, [whichWayOfBuyHouseType]);

    // 月供 等额本息月供固定，但是等额本金不是的，所以才用循环
    let m_downPayment = computed(() => {
      return Number(
        (
          Number(commercialLoanRes.value["月供"].toFixed(4)) +
          Number(providentFundLoansRes.value["月供"].toFixed(4))
        ).toFixed(4)
      );
    });

    // 年利率
    let year_rate_init = ref(0);
    let year_rate = computed(() => year_rate_init.value / 100);

    let m_alreadyRepaid = ref(1);

    effect(() => {
      m_alreadyRepaid.value =
        m_alreadyRepaid.value > m.value ? m.value : m_alreadyRepaid.value;
    }, [m, m_alreadyRepaid]);
    // 月供利率
    const month_rate = computed(() => year_rate.value / 12);

    // 首付款累计的成本
    let downPayment_total_cost = computed(() =>
      Number(
        (
          downPayment.value *
          Math.pow(1 + year_rate.value, m_alreadyRepaid.value / 12)
        ).toFixed(4)
      )
    );

    // 首付款累计的利息
    let downPayment_interest_count = computed(() =>
      Number((downPayment_total_cost.value - downPayment.value).toFixed(4))
    );

    // 月供获利的利息
    const m_interest = computed(() =>
      Number((m_downPayment.value * month_rate.value).toFixed(4))
    );

    // 已还月供累计的利息
    // 通过循环进行计算
    let m_interest_count = ref(0);
    // 已还月供累计的成本
    let m_total_cost = ref(0);
    // 已还月供过程中所支出的利息
    let m_interest_ = ref(0);
    effect(() => {
      m_interest_count.value = 0;
      m_total_cost.value = 0;
      m_interest_.value = 0;
      let m_downPayment_num = 0;
      for (let index = 1; index < m_alreadyRepaid.value + 1; index++) {
        if (whichWayOfBuyHouseType.value == "2") {
          // 等额本息
          let rate = m_interest.value * index;
          //   月供金额获利的利息累计
          m_interest_count.value += rate;
          m_interest_count.value = Number(m_interest_count.value.toFixed(4));
          //   月供金额累计的成本
          m_total_cost.value =
            m_interest_count.value + m_downPayment.value * index;
          m_total_cost.value = Number(m_total_cost.value.toFixed(4));
          //   已还月供过程中所支出的利息：
          m_interest_.value +=
            commercialLoanRes.value["还款记录表"][index - 1]["月利息"] +
            providentFundLoansRes.value["还款记录表"][index - 1]["月利息"];
          m_interest_.value = Number(m_interest_.value.toFixed(4));
        } else {
          let rate =
            (commercialLoanRes.value["还款记录表"][index - 1]["月本金"] +
              providentFundLoansRes.value["还款记录表"][index - 1]["月本金"]) *
            month_rate.value;
          m_downPayment_num +=
            commercialLoanRes.value["还款记录表"][index - 1]["月供"] +
            providentFundLoansRes.value["还款记录表"][index - 1]["月供"];
          //   月供金额获利的利息累计
          m_interest_count.value += rate;
          m_interest_count.value = Number(m_interest_count.value.toFixed(4));
          //   月供金额累计的成本
          m_total_cost.value = m_downPayment_num + m_interest_count.value;

          m_total_cost.value = Number(m_total_cost.value.toFixed(4));
          //   已还月供过程中所支出的利息：
          m_interest_.value +=
            commercialLoanRes.value["还款记录表"][index - 1]["月利息"] +
            providentFundLoansRes.value["还款记录表"][index - 1]["月利息"];
          m_interest_.value = Number(m_interest_.value.toFixed(4));
        }

        // 等额本金
      }
    }, [m_alreadyRepaid]);

    let first_pay_date = `2023-06`;
    let last_pay_date = `2025-12`;

    effect(() => {
      document.title = "xx";
    }, []);
    return {
      whichWayOfBuyHouseType,
      unitPrice,
      commercialLoanRes,
      providentFundLoansRes,
      commercialLoan,
      commercialLoanRate,
      providentFundLoans,
      providentFundLoansRate,
      m_interest_,
      m_interest_count,
      year_rate,
      year_rate_init,
      month_rate,
      downPayment_interest_count,
      m_interest,
      downPayment,
      downPayment_total_cost,
      m,
      m_alreadyRepaid,
      m_downPayment,
      m_total_cost,
      house_cost,
      house_area,
    };
  },
};
</script>
<style lang="scss" scoped>
.ul-css {
  height: 200px;
  overflow: scroll;
  .li-css {
    display: flex;
    flex-flow: row nowrap;
    > span {
      display: inline-block;
      min-width: 120px;
    }
    .small {
      min-width: 40px;
      width: 40px;
    }
  }
}
</style>
