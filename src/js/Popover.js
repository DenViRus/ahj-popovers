export default class Popover {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.currentTarget = null;
  }

  drawPopover() {
    this.popoverBox = document.createElement('div');
    this.popoverBox.className = 'popover-box';
    this.popoverBox.setAttribute('id', 'popoverBox');

    this.popoverList = document.createElement('ul');
    this.popoverList.className = 'popover-list';

    this.popoverMessage = document.createElement('div');
    this.popoverMessage.className = 'popover-message';

    this.popoverMessageHeading = document.createElement('h3');
    this.popoverMessageHeading.className = 'popover-message-heading';
    this.popoverMessageHeading.textContent = "I'm ";

    this.popoverMessageParagraph = document.createElement('p');
    this.popoverMessageParagraph.className = 'popover-message-paragraph';
    this.popoverMessageParagraph.textContent = 'I like';

    for (let i = 0, len = this.data.length; i < len; i++) {
      this.popoverItem = document.createElement('li');
      this.popoverItem.className = 'popover-item';

      this.popoverImage = document.createElement('img');
      this.popoverImage.className = 'popover-image';
      this.popoverImage.setAttribute('src', `${this.data[i].image}`);
      this.popoverImage.setAttribute('alt', this.data[i].name);
      this.popoverImage.setAttribute('id', this.data[i].id);

      this.popoverItem.append(this.popoverImage);
      this.popoverList.append(this.popoverItem);
    }

    this.popoverMessage.append(this.popoverMessageHeading);
    this.popoverMessage.append(this.popoverMessageParagraph);

    this.popoverBox.append(this.popoverList);
    this.popoverBox.append(this.popoverMessage);

    this.container.append(this.popoverBox);
  }

  showPopover() {
    const popoverListener1 = (event) => {
      event.preventDefault();

      if (this.currentTarget === event.target) {
        this.popoverMessage.classList.remove('active');
        this.currentTarget = null;
        return;
      }
      this.currentTarget = event.target;
      const targetClass = this.currentTarget.className;
      if (targetClass === 'popover-image') {
        const needData = this.data.find((item) => this.currentTarget.id === item.id);
        this.popoverMessage.classList.add('active');
        this.popoverMessage.style.top = `${
          this.currentTarget.parentElement.offsetTop
          - this.popoverMessage.offsetHeight
          - 25
        }px`;
        this.popoverMessage.style.left = `${
          this.currentTarget.parentElement.offsetLeft
          + this.currentTarget.parentElement.offsetWidth / 2
          - this.popoverMessage.offsetWidth / 2
        }px`;
        if (this.popoverName) {
          this.popoverName.remove();
        }
        this.popoverName = document.createElement('span');
        this.popoverName.className = 'popover-name';
        this.popoverName.style.color = needData.color;
        this.popoverName.textContent = needData.name;
        this.popoverMessageHeading.append(this.popoverName);

        const foods = [...this.popoverMessageParagraph.children];
        if (foods.includes(this.popoverFood)) {
          foods.forEach((item) => {
            item.remove();
          });
        }

        for (let i = 0, len = needData.food.length; i < len; i++) {
          this.popoverFood = document.createElement('span');
          this.popoverFood.className = 'popover-food';
          this.popoverFood.textContent = i + 1 < len ? `${needData.food[i]},` : `${needData.food[i]}.`;
          this.popoverFood.style.color = needData.color;
          this.popoverMessageParagraph.append(this.popoverFood);
        }
      }
    };

    this.popoverList.addEventListener('click', popoverListener1);
  }
}
