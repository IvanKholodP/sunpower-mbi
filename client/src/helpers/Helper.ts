//eslint-disable-next-line
export default new class Helper  {
	setAppStatusColor(status: number): string {
		switch(status){
			case 2:
				return 'yellow';
			case 3:
				return 'green';
			case 4:
				return 'red';
			default:
				return 'white';
		}
	}

	setAppStatus(status: number): string {
		switch(status) {
			case 1:
				return 'Очікує відправки';
			case 2:
				return 'В дорозі';
			case 3:
				return 'Виконана';
			case 4:
				return 'Відмінена';
			default:
				return 'Очікує відправки';
		}
	}

	setNameProduct(name: string): string {
		switch(name) {
			case 'solar':
				return 'Модуль';
			case 'invertor':
				return 'Інвертор';
			case 'other':
				return 'Інше';
			default:
				return 'Модуль';
		}
	}
}