import { Items } from 'lib/assets/custom-items'
import { shopFormula } from 'lib/assets/shop'
import { givePlayerMoneyAndXp } from 'lib/rpg/money'
import { Group } from 'lib/rpg/place'
import { FreeCost } from 'lib/shop/cost'
import { ShopNpc } from 'lib/shop/npc'

const bannedToSell = [Items.Menu, Items.Money] as string[]

export class Scavenger extends ShopNpc {
  constructor(group: Group) {
    super(group.point('scavenger').name('Мусорщик'))
    this.shop.body(() => 'Продай мне весь свой мусор')
    this.shop.menu((form, player) => {
      form.itemModifier(
        'Любой предмет',
        FreeCost,
        item =>
          !(item.typeId in shopFormula.shop) &&
          !bannedToSell.includes(item.typeId) &&
          !item.typeId.startsWith(Items.CompassPrefix) &&
          !item.typeId.startsWith('lw:'),
        'Любой непродаваемый предмет',
        slot => {
          givePlayerMoneyAndXp(player, Math.randomInt(0, slot.amount))
          slot.setItem()
        },
      )
    })
  }
}
