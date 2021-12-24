export default new class Helpers  {
	setAppStatus (status: number): string {
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

	deleteNullFromMessage (comments: null | string): string {
		switch(comments) {
			case null:
				return '';
			default:
				return comments;
		}
	}

	calculateFreeKWt(power: number, free: number): number {
		return (power * free) / 1000;
	}
}